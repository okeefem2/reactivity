import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '@reactivity/entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) { }
}
