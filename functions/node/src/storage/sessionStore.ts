import { TableClient, TableServiceClient, type TableEntity } from "@azure/data-tables";

import { AppError } from "../domain/errors";
import type { WickSession } from "../domain/types";

export interface SessionStore {
  create(session: WickSession): Promise<void>;
  get(sessionId: string): Promise<WickSession | undefined>;
  put(session: WickSession): Promise<void>;
  consumeRateLimit(key: string, limit: number, windowSeconds: number): Promise<void>;
}

interface SessionEntity extends TableEntity {
  payload: string;
}

let cachedStore: SessionStore | undefined;

export async function getSessionStore(): Promise<SessionStore> {
  if (cachedStore) return cachedStore;

  const connectionString = process.env.AzureWebJobsStorage;
  if (!connectionString) {
    throw new AppError(
      503,
      "session_store_unavailable",
      "The durable session store is not configured.",
    );
  }

  const tableName = process.env.WICK_SESSIONS_TABLE ?? "WickSessions";
  const service = TableServiceClient.fromConnectionString(connectionString);
  await service.createTable(tableName).catch((error: unknown) => {
    if (!isConflict(error)) throw error;
  });
  cachedStore = new AzureTableSessionStore(
    TableClient.fromConnectionString(connectionString, tableName),
  );
  return cachedStore;
}

export class AzureTableSessionStore implements SessionStore {
  constructor(private readonly table: TableClient) {}

  async create(session: WickSession): Promise<void> {
    await this.table.createEntity<SessionEntity>({
      partitionKey: "session",
      rowKey: session.sessionId,
      payload: JSON.stringify(session),
    });
  }

  async get(sessionId: string): Promise<WickSession | undefined> {
    try {
      const entity = await this.table.getEntity<SessionEntity>("session", sessionId);
      return JSON.parse(entity.payload) as WickSession;
    } catch (error) {
      if (isNotFound(error)) return undefined;
      throw error;
    }
  }

  async put(session: WickSession): Promise<void> {
    await this.table.upsertEntity<SessionEntity>(
      {
        partitionKey: "session",
        rowKey: session.sessionId,
        payload: JSON.stringify(session),
      },
      "Replace",
    );
  }

  async consumeRateLimit(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<void> {
    const bucket = Math.floor(Date.now() / (windowSeconds * 1000));
    const rowKey = `${key}-${bucket}`;

    for (let attempt = 0; attempt < 4; attempt += 1) {
      try {
        const entity = await this.table.getEntity<TableEntity & { count: number }>(
          "rate",
          rowKey,
        );
        if (entity.count >= limit) {
          throw new AppError(
            429,
            "rate_limit_exceeded",
            "Too many sessions were started. Try again later.",
            true,
          );
        }
        await this.table.updateEntity(
          { ...entity, count: entity.count + 1 },
          "Replace",
          { etag: entity.etag },
        );
        return;
      } catch (error) {
        if (error instanceof AppError) throw error;
        if (isNotFound(error)) {
          try {
            await this.table.createEntity({
              partitionKey: "rate",
              rowKey,
              count: 1,
            });
            return;
          } catch (createError) {
            if (isConflict(createError)) continue;
            throw createError;
          }
        }
        if (isPreconditionFailed(error)) continue;
        throw error;
      }
    }

    throw new AppError(
      503,
      "rate_limit_unavailable",
      "The session limit could not be checked.",
      true,
    );
  }
}

export class MemorySessionStore implements SessionStore {
  private readonly sessions = new Map<string, WickSession>();
  private readonly limits = new Map<string, { count: number; expiresAt: number }>();

  async create(session: WickSession): Promise<void> {
    this.sessions.set(session.sessionId, structuredClone(session));
  }

  async get(sessionId: string): Promise<WickSession | undefined> {
    const value = this.sessions.get(sessionId);
    return value ? structuredClone(value) : undefined;
  }

  async put(session: WickSession): Promise<void> {
    this.sessions.set(session.sessionId, structuredClone(session));
  }

  async consumeRateLimit(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<void> {
    const now = Date.now();
    const current = this.limits.get(key);
    const next = !current || current.expiresAt <= now
      ? { count: 1, expiresAt: now + windowSeconds * 1000 }
      : { ...current, count: current.count + 1 };
    this.limits.set(key, next);
    if (next.count > limit) {
      throw new AppError(429, "rate_limit_exceeded", "Too many sessions were started.");
    }
  }
}

function statusCode(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  return "statusCode" in error && typeof error.statusCode === "number"
    ? error.statusCode
    : undefined;
}

function isNotFound(error: unknown) {
  return statusCode(error) === 404;
}

function isConflict(error: unknown) {
  return statusCode(error) === 409;
}

function isPreconditionFailed(error: unknown) {
  return statusCode(error) === 412;
}
