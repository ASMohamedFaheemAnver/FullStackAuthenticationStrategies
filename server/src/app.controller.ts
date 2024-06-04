import { AppService } from './app.service';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './common/user';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('api/auth/callback/google')
  async google(@GetUser() user: User, @Res() res: Response) {
    return res.redirect('http://localhost:3000?jwt={jwt-token}');
  }

  @UseGuards(AuthGuard)
  @Get('api/auth/google/login')
  async callback() {
    return true;
  }
}
