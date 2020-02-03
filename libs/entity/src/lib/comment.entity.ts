import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from './user.entity';
import { ActivityEntity } from './activity.entity';

@Entity({ name: 'comment' })
export class CommentEntity {

  constructor(id, body) {
    this.id = id;
    this.body = body;
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @IsNotEmpty()
  @Column('text')
  readonly body: string;

  @Column('boolean')
  readonly isMain: boolean;

  @IsNotEmpty()
  @Column('date')
  readonly date: Date | string;

  @ManyToOne(type => UserEntity, author => author.comments)
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;

  @Column('uuid')
  authorId: string;

  @ManyToOne(type => ActivityEntity, activity => activity.comments)
  @JoinColumn({ name: 'activityId' })
  activity: ActivityEntity;

  @Column('uuid')
  activityId: string;
}
