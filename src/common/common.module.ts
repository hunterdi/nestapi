import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth/auth.module';
import { AppCacheModule } from './cache/app-cache.module';
import { LoggerModule } from './logger/logger.module';
import { MailModule } from './mail/mail.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Module({
    imports: [AuthModule, DatabaseModule, AppCacheModule, LoggerModule, MailModule],
    exports: [AuthModule, DatabaseModule, AppCacheModule, LoggerModule, MailModule],
    providers: [
    {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
    }]
})
export class CommonModule { }
