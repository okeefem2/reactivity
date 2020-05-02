import { Field, InputType, ID } from '@nestjs/graphql';
import { MaxLength, IsInt, IsPositive } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  @IsInt()
  @IsPositive()
  age: number;

  @Field(() => ID)
  companyId: string;
}
