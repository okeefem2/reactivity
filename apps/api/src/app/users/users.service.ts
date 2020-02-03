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

  async getProfile(username: string): Promise<User> {
    return this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo')
      .select([
        'user.id',
        'user.username',
        'user.bio',
        'photo.id',
        'photo.url',
        'photo.isMain',
      ])
      .where("user.username = :username", { username })
      .getOne().then(u => {
        console.log('user profile', u);
        const mainImage = u.photos && u.photos.find(p => p.isMain);
        return { ...u, image: mainImage && mainImage.url };
      });
  }
}
