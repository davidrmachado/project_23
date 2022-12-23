class HttpException extends Error {
  status: number;

  constructor(status: number, message: unknown) {
    super(message as string | undefined);
    this.status = status;
  }
}

export default HttpException;
