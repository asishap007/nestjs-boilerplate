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
import { ConfigService } from './config/config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    const config = this.configService.configurations;
    console.log('configurations domainName', config.domainName, config.port);
    throw new InternalServerErrorException({ message: 'Forbidden path' });
  }
}
