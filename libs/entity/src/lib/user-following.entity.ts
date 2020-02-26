import { Entity, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_following' })
export class UserFollowingEntity {

  @PrimaryColumn('text')
  followerUsername: string;

  @ManyToOne(type => UserEntity, user => user.following)
  @JoinColumn({
    name: 'followerUsername',
    referencedColumnName: 'username'
  })
  follower: UserEntity;

  @PrimaryColumn('text')
  followeeUsername: string;

  @ManyToOne(type => UserEntity, user => user.followers)
  @JoinColumn({
    name: 'followeeUsername',
    referencedColumnName: 'username'
  })
  followee: UserEntity;
}
