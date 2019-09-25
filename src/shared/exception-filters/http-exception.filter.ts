interface ExceptionResponse {
  hasError: boolean;
  body: any;
  statusCode: number;
  timeStamp: string;
  path: string;
  method: string;
  stackTrace?: string;
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from './AppError';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      return response.status(exception.httpStatus).json({
        errorCode: exception.errorCode,
        errorMsg: exception.errorMessage,
        usrMsg: exception.userMessage,
        httpCode: exception.httpStatus,
      });
    }
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: any = exception.getResponse() || {
      message: exception.message,
      error: 'error',
    };
    const expceptionResponse: ExceptionResponse = {
      hasError: true,
      body: {
        message: exceptionResponse.message,
        error: exceptionResponse.error,
      },
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      stackTrace: exception.stack.toString(), // Todo: show stack trace based on env
    };
    return response.status(status).json(expceptionResponse);
  }
}
