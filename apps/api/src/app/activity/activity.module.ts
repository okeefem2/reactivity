import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './activity.service';
import { ActivityEntity } from '@reactivity/entity';
import { UsersModule } from '../users/users.module';
import { UserActivityModule } from '../user-activity/user-activity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityEntity
    ]),
    UsersModule,
    UserActivityModule
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [
    TypeOrmModule
  ]
})
export class ActivityModule { }
