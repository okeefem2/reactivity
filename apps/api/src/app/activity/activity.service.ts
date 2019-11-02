import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Activity } from '@reactivity/common';

@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) { }

  findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  paginate(options: FindManyOptions<Activity>): Promise<Activity[]> {
    return this.activityRepository.find(options);
  }

  findById(id?: string): Promise<Activity> {
    return this.activityRepository.findOne(id);
  }

  find(criteria: Partial<Activity>): Promise<Activity[]> {
    return this.activityRepository.find(criteria);
  }

  delete(criteria: string | string[] | Partial<Activity>): Promise<DeleteResult> {
    return this.activityRepository.delete(criteria);
  }

  insert(activity: Activity): Promise<InsertResult> {
    return this.activityRepository.insert(activity);
  }

  update(id: string, activity: Partial<Activity>): Promise<UpdateResult> {
    return this.activityRepository.update(id, activity);
  }

  /**
   * Use if have a full activity object to save. Will add a new if doesn't exist
   * or update existing if it does
   * @param activity activity to save or update
   */
  save(activity: Activity): Promise<Activity> {
    return this.activityRepository.save(activity);
  }
}
