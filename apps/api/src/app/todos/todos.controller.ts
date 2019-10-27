import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { Todo } from '@reactivity/common';

@Controller('todos')
export class TodosController {

  private _todos: Todo[] = [
    { title: 'todo1' },
    { title: 'todo2' },
  ];

  @Get()
  todos(): Todo[] {
    return this._todos;
  }

  @Post()
  addTodo(@Body() todo: Todo): Todo {
    console.log(todo);
    if (!todo || !todo.title) throw new BadRequestException('TODO');

    this._todos.push(todo);
    return todo;
  }
}
