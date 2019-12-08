import { Controller, Get, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@reactivity/model';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  currentUser(@Request() req): Promise<User> {
    console.log('User!', req.user);
    return req.user;
  }
}
