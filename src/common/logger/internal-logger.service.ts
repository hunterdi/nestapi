/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LoggerService } from "@nestjs/common";

export class InternalLoggerService implements LoggerService {

    log(message: any, context?: string) {
        console.log('############### Internal Log - Start ###############');
        console.log(message, context);
        console.log('############### Internal Log - End ###############');
    }

    error(message: any, trace?: string, context?: string) {
        console.error('############### Internal Error - Start ###############');
        console.error(message, context);
        console.error('############### Internal Error - End ###############');
    }

    warn(message: any, context?: string) {
        console.warn('############### Internal Warn - Start ###############');
        console.warn(message, context);
        console.warn('############### Internal Warn - End ###############');
    }

    debug?(message: any, context?: string) {
        console.debug('############### Internal Debug - Start ###############');
        console.debug(message, context);
        console.debug('############### Internal Debug - End ###############');
    }

    verbose?(message: any, context?: string) {
        console.log('############### Internal Verbose - Start ###############');
        console.log(message, context);
        console.log('############### Internal Verbose - End ###############');
    }

}