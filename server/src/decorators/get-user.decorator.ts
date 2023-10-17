import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const uCtx = GqlExecutionContext.create(ctx);
  const req = uCtx.getContext().req;
  return req.user;
});
