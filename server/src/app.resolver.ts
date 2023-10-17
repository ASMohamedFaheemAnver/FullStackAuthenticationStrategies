import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Message } from './common/message';
import { User } from './common/user';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/jwt-auth.guard';
import { AuthPayload } from './payloads/auth-payload';
import { JwtService } from '@nestjs/jwt';
import { GetUser } from './decorators/get-user.decorator';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Query((_) => Message)
  root(): Message {
    return { message: 'server is up and running' };
  }

  @Query((_) => AuthPayload)
  signIn(): AuthPayload {
    const payload = { name: 'jwt' };
    const token = this.jwtService.sign(payload);
    return { token, ...payload };
  }

  @UseGuards(AuthGuard)
  @Query((_) => User)
  me(@GetUser() user: User): User {
    // console.log({ function: this.me.name, user });
    return { name: 'udev' };
  }
}
