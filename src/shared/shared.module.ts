import { Module } from '@nestjs/common';
import { ResponseService } from './services/response.service';

@Module({
  imports: [],
  providers: [ResponseService],
})
export class SharedModule {}
