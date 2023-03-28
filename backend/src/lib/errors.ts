export class Conflict extends Error{
  public statusCode = 409;

  constructor(msg: string){
    super(msg);
  }
}

export class NotFound extends Error {
  public statusCode = 404;

  constructor(msg: string) {
    super(msg);
  }
}

export class BadRequest extends Error {
  public statusCode = 400;

  constructor(msg: string) {
    super(msg);
  }
}