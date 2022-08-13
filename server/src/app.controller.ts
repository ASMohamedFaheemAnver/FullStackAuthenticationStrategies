import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  validateToken(
    @Request() req,
  ): Promise<{ isLoggedIn: boolean; token: string; user: any }> {
    return this.appService.validateToken(req.headers.authorization);
  }

  // Will show google signin we screen
  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginRedirect(@Req() req) {
    // return res.redirect(`${url}/auth/login`);
    // Here accessToken can be generated jwt access token
    //  return res.redirect(
    //    `${url}/auth/welcome-page?accessToken=${payload.accessToken}&expiresIn=${payload.expiresIn}`,
    //  );
    return req.user;
  }
}
