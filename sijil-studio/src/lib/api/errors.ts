export class ApiException extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}
