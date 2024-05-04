export default class ApiError {
  private static _message: string;
  private static _statusCode: number;

  constructor(message: string, statusCode: number) {
    ApiError._message = message;
    ApiError._statusCode = statusCode;
  }

  static getResponseMessage(resData: any) {
    return resData?.errors?.[0]?.description;
  }

  static generate(
    error: any,
    alt?: string
  ): { message: string; status: number } {
    if (error?.response?.data?.errors?.[0]?.description) {
      this._message = error?.response?.data?.errors?.[0]?.description;
    } else if (typeof error?.response?.data?.message === "string") {
      this._message = error?.response?.data?.message;
    } else if (Array.isArray(error?.response?.data?.message)) {
      this._message = error?.response?.data?.message[0];
    } else if (error?.response?.data?.message) {
      this._message = error?.response?.data?.message;
    } else if (error?.message) {
      this._message = error?.message;
    } else if (alt) this._message = alt;
    else if (this._message) {
      this._message = this._message;
    } else this._message = "An error occurred";

    if (!this._statusCode) this._statusCode = error?.response?.status || 500;

    return {
      message: this._message,
      status: this._statusCode,
    };
  }
}
