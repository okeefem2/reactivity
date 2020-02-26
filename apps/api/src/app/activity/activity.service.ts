import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ActivityEntity } from '@reactivity/entity';
import { PageableList, PaginateOptions } from '@reactivity/model';

const ACTIVITY_NOT_FOUND_ERROR = { errors: { activity: 'Not Found' } };


@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) { }

  async paginate(options: PaginateOptions, currentUsername: string): Promise<PageableList<ActivityEntity>> {
    let query = this.activityRepository.createQueryBuilder('activity')
      .leftJoinAndSelect('activity.attendees', 'attendee')
      .leftJoinAndSelect('attendee.user', 'user')
      .leftJoinAndSelect('user.followers', 'follower')
      .select([
        'activity',
        'attendee.isHost',
        'user.username',
        'user.email',
        'follower',
      ])
      ;
    console.log('options', options);

    if (options.hosting !== undefined) {
      query = query.where('attendee.isHost = :isHosting', { isHosting: options.hosting })
        .andWhere('user.username = :currentUsername', { currentUsername });
    }

    if (options.attending !== undefined) {
      query = query.where('attendee.isHost = :isHosting', { isHosting: false })
        .andWhere('user.username = :currentUsername', { currentUsername });
    }

    if (options.date) {
      query = query.where('activity.date >= :date', { date: options.date });
    }

    const totalCount = await query.getCount();
    console.log(query.getSql());

    query = query.offset(options.skip)
      .limit(options.take);

    return query
      .getMany()
      .then((activities) => {
        console.log(activities);
        const transformedActivities = activities.map((a) => this.transformAttendee(a, currentUsername));

        return {
          data: transformedActivities,
          options,
          totalCount,
        };
      });
  }

  async findById(id: string, currentUsername: string): Promise<ActivityEntity> {
    // const activity = await this.activityRepository.findOne(id, { relations: ['attendees'] });
    // TODO add isFollowed to attendee
    const activity = await this.activityRepository.createQueryBuilder('activity')
      .leftJoinAndSelect('activity.attendees', 'attendee')
      .leftJoinAndSelect('attendee.user', 'user')
      .leftJoinAndSelect('user.photos', 'photo')
      .leftJoinAndSelect('user.followers', 'follower')
      .select([
        'activity',
        'attendee.isHost',
        'user.username',
        'user.email',
        'photo.id',
        'photo.url',
        'photo.isMain',
        'follower',
      ])
      .where('activity.id = :id', { id: id })
      .getOne().then((activity) => this.transformAttendee(activity, currentUsername));

    if (!activity) {
      // For some reason my message is not being used...
      throw new HttpException(ACTIVITY_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    return activity;
  }

  async find(criteria: Partial<ActivityEntity>): Promise<ActivityEntity[]> {
    const activity = await this.activityRepository.find({
      ...criteria,
      relations: ['attendees']
    });
    if (!activity) {
      // For some reason my message is not being used...
      throw new HttpException(ACTIVITY_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return activity;
  }

  async delete(criteria: string | string[] | Partial<ActivityEntity>): Promise<DeleteResult> {
    const deleteResult = await this.activityRepository.delete(criteria);

    if (deleteResult.affected === 0) {
      throw new HttpException(ACTIVITY_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return deleteResult;
  }

  insert(activity: ActivityEntity): Promise<InsertResult> {
    return this.activityRepository.insert(activity);
  }

  async update(id: string, activity: Partial<ActivityEntity>): Promise<UpdateResult> {
    const updateResult = await this.activityRepository.update(id, activity);
    if (updateResult.affected === 0) {
      throw new HttpException(ACTIVITY_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return updateResult;
  }

  /**
   * Use if have a full activity object to save. Will add a new if doesn't exist
   * or update existing if it does
   * @param activity activity to save or update
   */
  save(activity: ActivityEntity): Promise<ActivityEntity> {
    return this.activityRepository.save(activity);
  }

  private transformAttendee(activity: ActivityEntity, currentUsername: string) {
    // YIKES lol
    if (activity.attendees) {
      activity.attendees = activity.attendees.map(attendee => {
        console.log('attendee', attendee);
        const mainImage = attendee.user && attendee.user.photos && attendee.user.photos.find(p => p.isMain);
        let isFollowed = false;
        if (attendee.user && attendee.user.username !== currentUsername) {
          isFollowed = attendee.user.followers.some(f => f.followerUsername === currentUsername);
        }
        return {
          ...attendee,
          user: {
            ...attendee.user,
            image: mainImage && mainImage.url,
            isFollowed
          }
        };
      });
    }

    return activity;
  }
}
