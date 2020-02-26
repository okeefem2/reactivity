import { Controller, Get, Body, Request, UseGuards, Param, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@reactivity/model';
import { AuthGuard } from '@nestjs/passport';
import { UserFollowingEntity } from '@reactivity/entity';
import { UserFollowingService } from '../user-following/user-following.service';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userFollowingService: UserFollowingService
  ) { }

  @Get()
  currentUser(@Request() req): Promise<User> {
    return this.usersService.getProfile(req.user.username, req.user.username);
  }

  @Get(':username')
  getProfile(@Request() req, @Param('username') username: string) {
    return this.usersService.getProfile(username, req.user.username);
  }

  @Get(':username/:predicate')
  getFollowers(@Request() req,
    @Param('username') username: string,
    @Param('predicate') predicate: 'followers' | 'following'): Promise<User[]> {
    return this.usersService.getList(username, predicate, req.user.username);
  }

  @Post(':username/follow')
  async follow(@Request() req, @Param('username') followeeUsername: string): Promise<UserFollowingEntity> {
    return this.userFollowingService.follow(req.user.username, followeeUsername);
  }

  @Delete(':username/follow')
  async unfollow(@Request() req, @Param('username') followeeUsername: string): Promise<DeleteResult> {
    return this.userFollowingService.unfollow(req.user.username, followeeUsername);
  }
}
