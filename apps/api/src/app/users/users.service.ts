import { Injectable } from '@nestjs/common';
import { UserEntity } from '@reactivity/entity';
import { User } from '@reactivity/model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  async insert(user: User): Promise<User> {
    const insertResult = await this.userRepository.insert(user);
    return { id: insertResult.identifiers[0].id, username: user.username, email: user.email };
  }
}
