import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFollowingEntity } from '@reactivity/entity';
import { Repository, DeleteResult } from 'typeorm';

const USER_FOLLOWING_NOT_FOUND_ERROR = { errors: { userFollowing: 'Not Found' } };

@Injectable()
export class UserFollowingService {

  constructor(
    @InjectRepository(UserFollowingEntity)
    private readonly userFollowingRepository: Repository<UserFollowingEntity>,
  ) { }

  async follow(followerUsername: string, followeeUsername: string): Promise<UserFollowingEntity> {
    // IRL should check if this exists or at least handle the error
    // Leaving for now as this is just for learning
    // Check this out https://github.com/drdgvhbh/postgres-error-codes
    return this.userFollowingRepository.save({
      followerUsername,
      followeeUsername,
    });
  }

  async unfollow(followerUsername: string, followeeUsername: string): Promise<DeleteResult> {
    const deleteResult = await this.userFollowingRepository.delete({
      followerUsername,
      followeeUsername,
    });

    if (deleteResult.affected === 0) {
      throw new HttpException(USER_FOLLOWING_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return deleteResult;

  }
}
