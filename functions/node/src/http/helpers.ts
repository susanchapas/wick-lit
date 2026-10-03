import type {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { AppError, asPublicError } from "../domain/errors";

export async function readJsonObject(
  request: HttpRequest,
): Promise<Record<string, unknown>> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 16_384) {
    throw new AppError(413, "request_too_large", "The request body is too large.");
  }
  try {
    const value = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Expected an object");
    }
    return value as Record<string, unknown>;
  } catch {
    throw new AppError(400, "invalid_json", "A valid JSON object is required.");
  }
}

export async function respond(
  request: HttpRequest,
  context: InvocationContext,
  work: () => Promise<{ status?: number; body: unknown }>,
): Promise<HttpResponseInit> {
  if (request.method === "OPTIONS") {
    return { status: 204, headers: corsHeaders(request) };
  }
  try {
    const result = await work();
    return {
      status: result.status ?? 200,
      jsonBody: result.body,
      headers: { ...corsHeaders(request), "cache-control": "no-store" },
    };
  } catch (error) {
    const publicError = asPublicError(error);
    context.error("Wick request failed", {
      code: publicError.body.error.code,
      status: publicError.status,
    });
    return {
      status: publicError.status,
      jsonBody: publicError.body,
      headers: { ...corsHeaders(request), "cache-control": "no-store" },
    };
  }
}

export function corsHeaders(request: HttpRequest): Record<string, string> {
  const origin = request.headers.get("origin");
  const allowed = (process.env.WICK_ALLOWED_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const headers: Record<string, string> = {
    vary: "Origin",
    "access-control-allow-headers": "authorization, content-type",
    "access-control-allow-methods": "GET, POST, OPTIONS",
  };
  if (origin && allowed.includes(origin)) {
    headers["access-control-allow-origin"] = origin;
  }
  return headers;
}

export function requiredString(
  value: unknown,
  field: string,
  maxLength = 200,
): string {
  if (typeof value !== "string" || value.length === 0 || value.length > maxLength) {
    throw new AppError(400, "invalid_request", `${field} must be a non-empty string.`);
  }
  return value;
}
