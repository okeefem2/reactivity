import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from '../../app/users/entity/user.entity';
import { PubSub } from 'apollo-server-express';
import { NotFoundException } from '@nestjs/common';
import { Company } from '../../app/users/entity/company.entity';

/**
 * https://github.com/nestjs/nest/blob/master/sample/23-graphql-code-first/src/recipes/recipes.resolver.ts
 */
@Resolver(() => User)
export class UsersResolver {
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = new User({ id, firstName: 'Michael', lastName: `O'Keefe`, company: new Company({ name: 'Home Depot' }) });
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }
}
