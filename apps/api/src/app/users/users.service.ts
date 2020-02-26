import { Injectable } from '@nestjs/common';
import { UserEntity } from '@reactivity/entity';
import { User } from '@reactivity/model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async insert(user: UserEntity): Promise<User> {
    const insertResult = await this.userRepository.insert(user);
    return { id: insertResult.identifiers[0].id, username: user.username, email: user.email };
  }

  async getProfile(username: string, currentUsername: string): Promise<User> {
    return this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo')
      .leftJoinAndSelect('user.followers', 'follower')
      .loadRelationCountAndMap('user.following', 'user.following')
      .select([
        'user.id',
        'user.username',
        'user.bio',
        'photo.id',
        'photo.url',
        'photo.isMain',
        'follower'
      ])
      .where('user.username = :username', { username })
      .getOne()
      .then(u => {
        console.log('user profile', u);
        const mainImage = u.photos && u.photos.find(p => p.isMain);
        let isFollowed = false;
        if (u.username !== currentUsername) {
          isFollowed = u.followers.some(f => f.followerUsername === currentUsername);
        }
        return {
          ...u as any,
          followers: u.followers.length,
          image: mainImage && mainImage.url,
          isFollowed,
        };
      });
  }

  async getList(username: string, predicate: 'followers' | 'following', currentUsername: string): Promise<User[]> {
    let query = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.photos', 'photo')
      ;

    if (predicate === 'following') {
      query = query.leftJoinAndSelect('user.followers', 'f')
        .where('f.followerUsername = :username', { username });
    } else {
      query = query.leftJoinAndSelect('user.following', 'f')
        .where('f.followeeUsername = :username', { username });
    }

    query = query.select([
      'user.id',
      'user.username',
      'user.bio',
      'photo.id',
      'photo.url',
      'photo.isMain',
      'f'
    ])

    return query
      .getMany()
      .then(users => {
        return users.map(u => {
          const mainImage = u.photos && u.photos.find(p => p.isMain);
          let isFollowed = false;
          if (u.username !== currentUsername) {
            isFollowed = u.followers.some(f => f.followerUsername === currentUsername);
          }
          return {
            ...u as any,
            followers: u.followers && u.followers.length,
            following: u.following && u.following.length,
            image: mainImage && mainImage.url,
            isFollowed
          };
        });
      });
  }
}
