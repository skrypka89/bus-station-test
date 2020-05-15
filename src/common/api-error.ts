/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

export default class ApiError {
  message: string | null;
  statusCode: number;
  error: string;
  data?: any;

  constructor(message: string | null, statusCode: number, data?: any) {
    this.statusCode = statusCode;
    this.error = httpStatus[statusCode];
    this.message = message || this.error;
    this.data = data;
  }

  static unauthorized(message?: string): ApiError {
    return new ApiError(message || null, 401);
  }

  static forbidden(): ApiError {
    return new ApiError(null, 403);
  }

  static badRequest(message: string, data?: {}): ApiError {
    return new ApiError(message, 400, data);
  }

  static paymentFailed(message: string): ApiError {
    return new ApiError(message, 402);
  }

  static notFound(message: string): ApiError {
    return new ApiError(message, 404);
  }

  static conflict(message: string): ApiError {
    return new ApiError(message, 409);
  }

  static unsupportedMediaType(message: string): ApiError {
    return new ApiError(message, 415);
  }

  static internal(): ApiError {
    return new ApiError(null, 500);
  }
}
