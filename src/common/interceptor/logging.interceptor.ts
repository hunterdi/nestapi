import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Before...');

    const now = Date.now();
    this.log(context.switchToHttp().getRequest());

    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`After... ${Date.now() - now}ms`)),
      );
  }

  private log(request) {
    const body = { ...request.body };
    delete body.password;
    delete body.passwordConfirmation;
    const user = (request as any).user;
    const userEmail = user ? user.email : null;

    this.logger.debug({
      timestamp: new Date().toISOString(),
      method: request.method,
      route: request.route.path,
      data: {
        body: body,
        query: request.query,
        params: request.params,
      },
      from: request.ip,
      madeBy: userEmail,
    });
  }
}