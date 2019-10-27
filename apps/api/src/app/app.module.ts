import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { ValuesController } from './values/values.controller';

@Module({
  imports: [],
  controllers: [AppController, TodosController, ValuesController],
  providers: [AppService],
})
export class AppModule {}
