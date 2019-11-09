import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ActivityEntity } from '@reactivity/entity';
@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
  ) { }

  findAll(): Promise<ActivityEntity[]> {
    return this.activityRepository.find();
  }

  paginate(options: FindManyOptions<ActivityEntity>): Promise<ActivityEntity[]> {
    return this.activityRepository.find(options);
  }

  findById(id?: string): Promise<ActivityEntity> {
    return this.activityRepository.findOne(id);
  }

  find(criteria: Partial<ActivityEntity>): Promise<ActivityEntity[]> {
    return this.activityRepository.find(criteria);
  }

  delete(criteria: string | string[] | Partial<ActivityEntity>): Promise<DeleteResult> {
    return this.activityRepository.delete(criteria);
  }

  insert(activity: ActivityEntity): Promise<InsertResult> {
    return this.activityRepository.insert(activity);
  }

  update(id: string, activity: Partial<ActivityEntity>): Promise<UpdateResult> {
    return this.activityRepository.update(id, activity);
  }

  /**
   * Use if have a full activity object to save. Will add a new if doesn't exist
   * or update existing if it does
   * @param activity activity to save or update
   */
  save(activity: ActivityEntity): Promise<ActivityEntity> {
    return this.activityRepository.save(activity);
  }
}
