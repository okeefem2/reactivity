import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Company } from './company.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => Int)
  age: number;

  @Field(() => ID)
  positionId: string;

  @Field(() => Company)
  company: Company;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}
