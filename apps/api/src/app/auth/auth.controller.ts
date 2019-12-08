import { Controller, UseGuards, Post, Request, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '@reactivity/model';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: User) {
    // user comes from the guard via auth.strategy.validate
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() { username, email, password }: User) {
    await this.authService.createUser(username, password, email)
    return this.authService.login({ username, password, email });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  currentUser(@Request() req): Promise<User> {
    // Because of the guard, we will only get this far if the jwt is valid still
    console.log('User!', req.user);

    return this.usersService.findByUsername(req.user.username);
  }
}
