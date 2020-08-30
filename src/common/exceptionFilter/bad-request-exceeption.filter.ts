import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                stackTrace: exception.stack,
                message: exception.message,
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}