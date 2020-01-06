import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivityEntity } from 'libs/entity/src/lib/user-activity.entity';
import { Repository, DeleteResult } from 'typeorm';

const USER_ACTIVITY_NOT_FOUND_ERROR = { errors: { activity: 'Not Found' } };

@Injectable()
export class UserActivityService {

  constructor(
    @InjectRepository(UserActivityEntity)
    private readonly userActivityRepository: Repository<UserActivityEntity>,
  ) { }

  async attend(userId: string, activityId: string, isHost = false) {
    return this.userActivityRepository.save({
      userId,
      activityId,
      dateJoined: new Date(),
      isHost
    });
  }

  async leave(userId: string, activityId: string): Promise<DeleteResult> {
    const deleteResult = await this.userActivityRepository.delete({ userId, activityId });

    if (deleteResult.affected === 0) {
      throw new HttpException(USER_ACTIVITY_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return deleteResult;
  }
}
