import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
@Injectable()
export class GoogleCustomStrategy extends PassportStrategy(
  Strategy,
  'google-custom',
) {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async validate(req: Request): Promise<any> {
    const authToken = req.headers['authorization'];
    // console.log({ authToken });
    // Validate google token
    return { name: 'google-user' };
  }
}
