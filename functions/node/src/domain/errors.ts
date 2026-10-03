export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly retryable = false,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function asPublicError(error: unknown): {
  status: number;
  body: { error: { code: string; message: string; retryable: boolean } };
} {
  if (error instanceof AppError) {
    return {
      status: error.status,
      body: {
        error: {
          code: error.code,
          message: error.message,
          retryable: error.retryable,
        },
      },
    };
  }

  return {
    status: 500,
    body: {
      error: {
        code: "internal_error",
        message: "The request could not be completed.",
        retryable: false,
      },
    },
  };
}
