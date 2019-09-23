import { Module } from '@nestjs/common';
import { ResponseTransformInterceptor } from './services/response.service';

@Module({
  imports: [],
  providers: [ResponseTransformInterceptor],
})
export class SharedModule {}
