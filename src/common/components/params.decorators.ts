import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import * as requestIp from 'request-ip';

export const IpAddress = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	if (request.connection.remoteAddress || request.ip)
		return request.connection.remoteAddress || request.ip;
	return requestIp.getClientIp(request);
});

export const LoggedUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();

	if (request.user)
		return request.user;
	return null;
});