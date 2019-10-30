import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { ValuesController } from './values/values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityModule } from './activity/activity.module';
import { config } from '../config/typeorm.config';

@Module({
  imports: [
    ActivityModule,
    TypeOrmModule.forRoot({
      ...config
    })
  ],
  controllers: [AppController, TodosController, ValuesController],
  providers: [AppService],
})
export class AppModule { }
