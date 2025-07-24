import { type TJwtPayloadWithRefreshToken } from '@diwi/contracts';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (
    data: keyof TJwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
