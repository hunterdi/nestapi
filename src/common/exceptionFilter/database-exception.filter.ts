import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = HttpStatus.UNPROCESSABLE_ENTITY;

        response
            .status(status)
            .json({
                query: exception.query,
                parameters: exception.parameters,
                message: exception.code,
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}