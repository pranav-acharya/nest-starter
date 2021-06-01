import { Controller, Get, Request, Post, UseGuards, Logger  } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JWTAuthGuard, LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // passport-local strategy has default name of 'local'
  // Hence an auth guard can be stragey specific
  // @UseGuards(AuthGuard('local')) 
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    Logger.log(`Logged in ${JSON.stringify(req.user)}`);
    // passport automatically assigns user to the req object.
    return this.authService.login(req.user);
  }
}
