export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRequest";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Unauthorized";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFound";
  }
}
