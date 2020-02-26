import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@reactivity/entity';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserFollowingModule } from '../user-following/user-following.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserFollowingModule
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule { }
