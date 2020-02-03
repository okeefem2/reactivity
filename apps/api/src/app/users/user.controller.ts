import { Controller, Get, Body, Request, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@reactivity/model';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  currentUser(@Request() req): Promise<User> {
    return this.usersService.getProfile(req.user.username);
  }

  @Get(':username')
  getProfile(@Param('username') username: string) {
    return this.usersService.getProfile(username);
  }
}
