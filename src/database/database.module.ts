import { Module } from '@nestjs/common';
import * as config from 'config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        ({
          type: config.databaseType,
          host: config.databaseHost,
          port: config.databasePort,
          database: config.databaseName,
          username: config.databaseUsername,
          password: config.databasePassword,
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
