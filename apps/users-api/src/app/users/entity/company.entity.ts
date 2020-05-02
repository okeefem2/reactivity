import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Company {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [User])
  users: User[];

  constructor(data?: Partial<Company>) {
    Object.assign(this, data);
  }
}
