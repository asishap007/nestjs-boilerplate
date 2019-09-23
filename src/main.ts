import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import * as config from 'config';
import { HttpExceptionFilter } from './shared/exception-filters/http-exception.filter';
import { ResponseTransformInterceptor } from './shared/services/response.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  app.use(
    rateLimit({
      windowMs: config.rateLimiter.windowMs, // 15 minutes
      max: config.rateLimiter.maxRequest, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  await app.listen(3000);
}
bootstrap();
