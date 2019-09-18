import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.configurations.databaseType,
          host: configService.configurations.databaseHost,
          port: configService.configurations.databasePort,
          database: configService.configurations.databaseName,
          username: configService.configurations.databaseUsername,
          password: configService.configurations.databasePassword,
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          migrations: ['src/**/*.migration{.ts,.js}'],
          synchronize: true,
          logging: true,
          useNewUrlParser: true,
        } as TypeOrmModuleOptions),
    }),
  ],
})
export class DatabaseModule {}
