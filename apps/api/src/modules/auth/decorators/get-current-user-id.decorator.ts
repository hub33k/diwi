import { type TJwtPayloadData } from '@diwi/contracts';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as TJwtPayloadData;
    return user.sub;
  },
);
