import { Module } from '@nestjs/common';
import { InternalLoggerService } from './internal-logger.service';

@Module({
    imports: [],
    controllers: [],
    providers: [InternalLoggerService],
    exports: [InternalLoggerService],
})
export class LoggerModule { }
