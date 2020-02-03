import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ActivityEntity } from '@reactivity/entity';

const ACTIVITY_NOT_FOUND_ERROR = { errors: { activity: 'Not Found' } };

@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) { }

  findAll(): Promise<ActivityEntity[]> {
    return this.activityRepository.createQueryBuilder('activity')
      .leftJoinAndSelect('activity.attendees', 'attendee')
      .leftJoinAndSelect('attendee.user', 'user')
      .select([
        'activity',
        'attendee.isHost',
        'user.username',
        'user.email'
      ])
      .getMany().then((activities) => activities.map(this.addMainPhotoToAttendee));
  }

  paginate(options: FindManyOptions<ActivityEntity>): Promise<ActivityEntity[]> {
    return this.activityRepository.find(options);
  }

  async findById(id?: string): Promise<ActivityEntity> {
    // const activity = await this.activityRepository.findOne(id, { relations: ['attendees'] });
    const activity = await this.activityRepository.createQueryBuilder('activity')
      .leftJoinAndSelect('activity.attendees', 'attendee')
      .leftJoinAndSelect('attendee.user', 'user')
      .leftJoinAndSelect('user.photos', 'photo')
      .select([
        'activity',
        'attendee.isHost',
        'user.username',
        'user.email',
        'photo.id',
        'photo.url',
        'photo.isMain',
      ])
      .where("activity.id = :id", { id: id })
      .getOne().then(this.addMainPhotoToAttendee);

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

  private addMainPhotoToAttendee(activity: ActivityEntity) {
    // YIKES lol
    activity.attendees = activity.attendees && activity.attendees.map(attendee => {
      const mainImage = attendee.user && attendee.user.photos && attendee.user.photos.find(p => p.isMain);
      return { ...attendee, user: { ...attendee.user, image: mainImage && mainImage.url } };
    });
    return activity;
  }
}
