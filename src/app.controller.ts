import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as config from 'config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(
      'configurations domainName',
      config.get('domainName'),
      config.get('port'),
    );
    throw new InternalServerErrorException({ message: 'Forbidden path' });
  }
}
