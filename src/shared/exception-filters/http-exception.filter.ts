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
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const expceptionResponse: ExceptionResponse = {
      hasError: true,
      body: exception.getResponse(),
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      stackTrace: exception.stack.toString(),
    };
    return response.status(status).json(expceptionResponse);
  }
}
