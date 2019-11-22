import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ActivityEntity } from '@reactivity/entity';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {

  constructor(private activityService: ActivityService) { }
  // TODO figure out how to use observables here...

  @Get()
  activities(): Promise<ActivityEntity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  async aactivity(@Param('id') id: string): Promise<ActivityEntity> {
    return await this.activityService.findById(id);
  }

  @Post()
  async createActivity(@Body() activity: ActivityEntity): Promise<ActivityEntity> {
    const result = await this.activityService.insert(activity);
    return { id: result.identifiers, ...activity };
  }

  @Put(':id')
  async updateActivity(@Param('id') id: string, @Body() activity: Partial<ActivityEntity>): Promise<ActivityEntity> {
    await this.activityService.update(id, activity);
    return this.activityService.findById(id);
  }

  @Delete(':id')
  async deleteActivity(@Param('id') id: string): Promise<void> {
    await this.activityService.delete(id);
    return;
  }
}
