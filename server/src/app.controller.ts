import { AppService } from './app.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './common/user';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { EnvKeys } from './constants/strings';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('api/auth/callback/google')
  async callback(@GetUser() user: User, @Res() res: Response) {
    return res.redirect('http://localhost:3000?jwt={jwt-token}');
  }

  // Window open this and google will redirect to callback and then redirect to client with new token which can be jwt/google token
  @UseGuards(AuthGuard)
  @Get('api/auth/google/login')
  async googleLogin() {}

  // Next auth refresh logic
  @Post('create-user')
  async googleCreateUser(@Body() body: any) {
    const idToken = body?.idToken;
    // Verify idToken before mutating
    console.log({ idToken });
    const payload = { name: 'jwt' };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    return {
      accessToken,
      refreshToken,
      accessTokenExpires: +(Date.now() + 10000),
      ...payload,
    };
  }

  @Post('access-token')
  async refreshToken(@Body() body: any) {
    const refreshToken = body?.refreshToken;
    console.log({ body });
    await this.jwtService.verify(refreshToken);
    // throw new ForbiddenException('not allowed to refresh token');
    const payload = { name: 'jwt' };
    const accessToken = this.jwtService.sign({
      ...payload,
    });
    // Expires in 10s
    return {
      accessToken,
      refreshToken,
      accessTokenExpires: +(Date.now() + 10000),
    };
  }
}
