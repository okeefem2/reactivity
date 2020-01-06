import { Module } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivityEntity } from 'libs/entity/src/lib/user-activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserActivityEntity
    ])
  ],
  providers: [UserActivityService],
  exports: [
    UserActivityService,
    TypeOrmModule
  ]
})
export class UserActivityModule { }
