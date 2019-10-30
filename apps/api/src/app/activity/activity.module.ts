import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from '@reactivity/common';
import { ActivityService } from './activity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity])
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [
    TypeOrmModule
  ]
})
export class ActivityModule { }
