import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SharedModule, ConfigModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
