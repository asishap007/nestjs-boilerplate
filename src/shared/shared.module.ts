import { Module } from '@nestjs/common';
import { ResponseTransformInterceptor } from './services/response.service';
import { HelperService } from './services/helper.service';
import { EmailService } from './services/email.service';

@Module({
  imports: [],
  providers: [ResponseTransformInterceptor, HelperService, EmailService],
  exports: [HelperService, EmailService],
})
export class SharedModule {}
