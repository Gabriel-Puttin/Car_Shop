export default class ErrorMap extends Error {
  public status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = statusCode;
  }
}