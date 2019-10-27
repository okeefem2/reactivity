import { Controller, Get } from '@nestjs/common';
import { Value } from '@reactivity/common';

@Controller('values')
export class ValuesController {
  private _values: Value[] = [
    { id: 3, name: 'Cooper' },
    { id: 4, name: 'Ollie' },
    { id: 5, name: 'Norman' },
    { id: 6, name: 'Ellie' },
  ];

  @Get()
  todos(): Value[] {
    return this._values;
  }
}
