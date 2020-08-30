import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    use(req: Request, res: Response, next: any) {
        const { ip, method, originalUrl: url } = req;
        const hostname = require('os').hostname();
        const userAgent = req.get('user-agent') || '';
        const referer = req.get('referer') || '';

        res.on('close', () => {
            const { statusCode, statusMessage } = res;
            const contentLength = res.get('content-length');
            const logger = {
                hostname: hostname,
                method: method,
                url: url,
                statusCode: statusCode,
                statusMessage: statusMessage,
                contentLength: contentLength,
                referer: referer,
                userAgent: userAgent,
                ip: ip
            };
            // console.log('################### LoggerMiddleware - Start ###################');
            // console.log(logger);
            // console.log('################### LoggerMiddleware - End ###################');
        });

        next();
    }
}
