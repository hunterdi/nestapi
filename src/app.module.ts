import { Module, NestModule, MiddlewareConsumer, ClassSerializerInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainsModule } from './domains/domains.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.production.env'],
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        SERVER_PORT: Joi.number(),
        JWT_EXPIRES_IN: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        FILE_PATH: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    CommonModule,
    DomainsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*");
  }
}
