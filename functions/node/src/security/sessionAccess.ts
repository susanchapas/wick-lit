import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

import { AppError } from "../domain/errors";

export function createSessionCredential(): {
  token: string;
  tokenHash: string;
} {
  const token = randomBytes(32).toString("base64url");
  return { token, tokenHash: hashToken(token) };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function assertSessionAccess(expectedHash: string, suppliedToken?: string) {
  if (!suppliedToken) {
    throw new AppError(401, "session_token_required", "A session token is required.");
  }

  const actual = Buffer.from(hashToken(suppliedToken), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new AppError(403, "invalid_session_token", "The session token is invalid.");
  }
}

export function readBearerToken(authorization: string | null): string | undefined {
  if (!authorization) return undefined;
  const match = /^Bearer\s+(.+)$/i.exec(authorization.trim());
  return match?.[1];
}
