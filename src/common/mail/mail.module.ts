import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './mail-config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '../interceptor/winston-config';

@Module({
    imports: [
        WinstonModule.forRoot(winstonConfig),
        MailerModule.forRoot(mailerConfig)
    ],
    exports: [],
})
export class MailModule { }