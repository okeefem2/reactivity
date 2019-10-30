import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
