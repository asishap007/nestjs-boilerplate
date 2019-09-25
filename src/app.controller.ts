import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    throw new InternalServerErrorException({
      message: 'Forbidden path',
    });
  }
}
