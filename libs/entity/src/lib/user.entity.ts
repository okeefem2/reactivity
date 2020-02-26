import { Column, PrimaryGeneratedColumn, Entity, OneToMany, Unique, Index } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserActivityEntity } from './user-activity.entity';
import { PhotoEntity } from './photo.entity';
import { CommentEntity } from './comment.entity';
import { UserFollowingEntity } from './user-following.entity';

// https://github.com/typestack/class-validator#validation-decorators
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @IsNotEmpty()
  @Column('text')
  @Index({ unique: true })
  readonly username: string;

  @IsNotEmpty()
  @Column('text')
  // TODO custom validator https://github.com/typestack/class-validator#custom-validation-decorators
  readonly password: string;

  @IsNotEmpty()
  @Column({
    type: "text",
    default: "test@test.com"
  })
  @IsEmail()
  readonly email: string;

  @Column({
    type: "text",
    nullable: true,
  })
  readonly bio?: string;

  @OneToMany('UserActivityEntity', 'user')
  activities: UserActivityEntity[];

  // A followee will have followers
  // Query where the followee is this user
  @OneToMany('UserFollowingEntity', 'followee')
  followers: UserFollowingEntity[];

  // A follower will have users they are following
  // Query where the follower is this user
  @OneToMany('UserFollowingEntity', 'follower')
  following: UserFollowingEntity[];

  @OneToMany('PhotoEntity', 'user')
  photos: PhotoEntity[];

  @OneToMany('CommentEntity', 'author')
  comments: CommentEntity[];

  image?: string;
  followersCount?: number;
  followingCount?: number;

  // @ManyToMany(type => UserEntity, user => user.following)
  // @JoinTable()
  // followers: UserEntity[];

  // @ManyToMany(type => UserEntity, user => user.followers)
  // following: UserEntity[];

  // @RelationCount((user: UserEntity) => user.followers)
  // followersCount: number;

  // @RelationCount((user: UserEntity) => user.following)
  // followingCount: number;
}
