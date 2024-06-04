import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import {
  PassportAuthStrategies,
  PassportAuthStrategyKeys,
} from 'src/constants/strings';

@Injectable()
export class AuthGuard extends PassportAuthGuard([
  // PassportAuthStrategies.jwt,
  // PassportAuthStrategies.firebaseJwt,
  PassportAuthStrategies.google,
]) {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = this.getRequest(context);
      // If user already user exist it means we have mutated the context inside context using ws token.
      // We are doing it in onConnection, don't know it will support multiple tokens
      await super.canActivate(context);
      // console.log({ request });
      const roles = this.reflector.get<string[]>(
        PassportAuthStrategyKeys.roles,
        context.getHandler(),
      );
      const user = request.user;
      // console.log({ user });
      if (roles?.length) {
      }
    } catch (err) {
      console.log({ err });
      return false;
    }
    return true;
  }
}
