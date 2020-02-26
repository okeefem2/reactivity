import { Module } from '@nestjs/common';
import { UserFollowingService } from './user-following.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollowingEntity } from '@reactivity/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserFollowingEntity,
    ])
  ],
  providers: [UserFollowingService],
  exports: [
    UserFollowingService,
    TypeOrmModule,
  ]
})
export class UserFollowingModule { }
