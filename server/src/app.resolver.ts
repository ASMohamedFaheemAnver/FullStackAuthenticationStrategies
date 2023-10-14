import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Message } from './common/message';
import { User } from './common/user';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query((_) => Message)
  root(): Message {
    return { message: 'server is up and running' };
  }

  @UseGuards(AuthGuard)
  @Query((_) => User)
  me(): User {
    console.log({ function: this.me.name });
    return { name: 'udev' };
  }
}
