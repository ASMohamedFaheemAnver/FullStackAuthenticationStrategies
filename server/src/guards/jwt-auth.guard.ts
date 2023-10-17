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
  PassportAuthStrategies.jwt,
  PassportAuthStrategies.firebaseJwt,
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
      await super.canActivate(context);
      const request = this.getRequest(context);
      const roles = this.reflector.get<string[]>(
        PassportAuthStrategyKeys.roles,
        context.getHandler(),
      );
      const user = request.user;
      if (roles?.length) {
      }
    } catch (err) {
      return false;
    }
    return true;
  }
}
