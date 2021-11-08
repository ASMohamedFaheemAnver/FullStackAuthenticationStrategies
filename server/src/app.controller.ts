import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  velidateToken(
    @Request() req,
  ): Promise<{ isLoggedIn: boolean; token: string; user: any }> {
    return this.appService.velidateToken(req.headers.authorization);
  }
}
