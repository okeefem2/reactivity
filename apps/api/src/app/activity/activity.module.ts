import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityService } from './activity.service';
import { ActivityEntity } from '@reactivity/entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [
    TypeOrmModule
  ]
})
export class ActivityModule { }
