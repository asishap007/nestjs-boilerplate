/***
 * Sample for Custom exception
 */
import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super({ message: 'Custom exception error message.' }, 601);
  }
}
