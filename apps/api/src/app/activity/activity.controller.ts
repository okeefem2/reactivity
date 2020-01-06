import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ActivityEntity } from '@reactivity/entity';
import { ActivityService } from './activity.service';
import { AuthGuard } from '@nestjs/passport';
import { UserActivityService } from '../user-activity/user-activity.service';
import { UsersService } from '../users/users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('activity')
export class ActivityController {

  constructor(
    private readonly activityService: ActivityService,
    private readonly userActivityService: UserActivityService,
    private readonly usersService: UsersService
  ) { }
  // TODO figure out how to use observables here...

  @Get()
  activities(): Promise<ActivityEntity[]> {
    return this.activityService.findAll();
  }

  @Get(':id')
  async activity(@Param('id') id: string): Promise<ActivityEntity> {
    return await this.activityService.findById(id);
  }

  @Post()
  async createActivity(@Request() req, @Body() activity: ActivityEntity): Promise<ActivityEntity> {
    const result = await this.activityService.insert(activity);
    activity = { id: result.identifiers, ...activity };
    const user = await this.usersService.findByUsername(req.user.username)
    await this.userActivityService.attend(user.id, activity.id, true);
    return activity;
  }

  @Post(':id/attend')
  async attendActivity(@Request() req, @Param('id') id: string): Promise<ActivityEntity> {
    const user = await this.usersService.findByUsername(req.user.username)
    await this.userActivityService.attend(user.id, id);
    return this.activityService.findById(id);
  }

  @Delete(':id/attend')
  async leaveActivity(@Request() req, @Param('id') id: string): Promise<ActivityEntity> {
    const user = await this.usersService.findByUsername(req.user.username)
    await this.userActivityService.leave(user.id, id);
    return this.activityService.findById(id);
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
