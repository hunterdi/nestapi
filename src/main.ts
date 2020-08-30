import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';
import { HttpExceptionFilter } from './common/exceptionFilter/http-exception.filter';
import { DatabaseExceptionFilter } from './common/exceptionFilter/database-exception.filter';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { InternalLoggerService } from './common/logger/internal-logger.service';
import { BadRequestExceptionFilter } from './common/exceptionFilter/bad-request-exceeption.filter';
import { winstonConfig } from './common/interceptor/winston-config';
import { WinstonModule } from 'nest-winston';

const port = process.env.SERVER_PORT;

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, {
    logger,
    // logger: ['debug', 'error', 'log'],
  });

  app.use(requestIp.mw());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new DatabaseExceptionFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useLogger(app.get(InternalLoggerService));
  app.enableCors();
  app.use(helmet());
  // app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, //15 minutes
      max: 100, //limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(port);
  Logger.log(`Server started runningon http:localhost:${port}`, 'Bootstrap');
}
bootstrap();
