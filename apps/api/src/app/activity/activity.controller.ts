import { Controller, Get, Post, Body, Put, Delete, Param, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Activity } from '@reactivity/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {

  constructor(private activityService: ActivityService) { }
  // TODO figure out how to use observables here...

  @Get()
  activities(): Promise<Activity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  async aactivity(@Param('id') id: string): Promise<Activity> {
    try {
      const activity = await this.activityService.findById(id);
      return activity;
    } catch (e) {
      throw new NotFoundException(`Unable to find entity ${id}`);
    }
  }

  @Post()
  async createActivity(@Body() activity: Activity): Promise<Activity> {
    // TODO validation
    try {
      const result = await this.activityService.insert(activity);
      return { id: result.identifiers, ...activity };
    } catch (e) {
      throw new InternalServerErrorException(`Unable to create new activity`);
    }
  }

  @Put(':id')
  async updateActivity(@Param('id') id: string, @Body() activity: Activity): Promise<Activity> {
    // TODO validation
    try {
      await this.activityService.update(id, activity);
      return this.activityService.findById(id);
    } catch (e) {
      throw new InternalServerErrorException(`Unable to update activity ${id}`);
    }
  }

  @Delete(':id')
  async deleteActivity(@Param('id') id: string): Promise<void> {
    try {
      await this.activityService.delete(id);
      return;
    } catch (e) {
      throw new InternalServerErrorException(`Unable to delete activity ${id}`);
    }
  }
}
