import { Module } from '@nestjs/common';
import { ResponseTransformInterceptor } from './services/response.service';
import { HelperService } from './services/helper.service';

@Module({
  imports: [],
  providers: [ResponseTransformInterceptor, HelperService],
  exports: [HelperService],
})
export class SharedModule {}
