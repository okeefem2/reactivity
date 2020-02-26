import { Column, Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from './user.entity';
import { ActivityEntity } from './activity.entity';

@Entity({ name: 'user_activity' })
export class UserActivityEntity {

  @PrimaryColumn('uuid')
  userId: string;

  @ManyToOne(type => UserEntity, user => user.activities)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @PrimaryColumn('uuid')
  activityId: string;

  @ManyToOne(type => ActivityEntity, activity => activity.attendees)
  @JoinColumn({ name: 'activityId', referencedColumnName: 'id' })
  activity: ActivityEntity;

  @IsNotEmpty()
  @Column('date')
  dateJoined: Date;

  @Column('boolean')
  isHost: boolean;
}
