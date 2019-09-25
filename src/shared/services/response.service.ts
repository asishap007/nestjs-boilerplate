import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  hasError: boolean;
  body: T;
  statusCode: HttpStatus;
}

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        hasError: false,
        body: data,
        statusCode: HttpStatus.OK,
      })),
    );
  }
}
