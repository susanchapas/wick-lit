import { describe, expect, it } from "vitest";

import { AppError } from "../domain/errors";
import { assertSessionAccess, createSessionCredential } from "../security/sessionAccess";

describe("session access", () => {
  it("accepts only the matching opaque token", () => {
    const credential = createSessionCredential();
    expect(() => assertSessionAccess(credential.tokenHash, credential.token)).not.toThrow();
    expect(() => assertSessionAccess(credential.tokenHash, "wrong-token")).toThrowError(
      AppError,
    );
    expect(() => assertSessionAccess(credential.tokenHash)).toThrowError(AppError);
  });
});
