import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserActivityEntity } from './user-activity.entity';

// https://github.com/typestack/class-validator#validation-decorators
@Entity({ name: 'activity' })
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @IsNotEmpty()
  @Column('text')
  readonly title: string;

  @IsNotEmpty()
  @Column('text')
  readonly description: string;

  @IsNotEmpty()
  @Column('text')
  readonly category: string;

  @IsNotEmpty()
  @Column('date')
  readonly date: Date | string;

  @IsNotEmpty()
  @Column('text')
  readonly city: string;

  @IsNotEmpty()
  @Column('text')
  readonly venue: string;

  @OneToMany('UserActivityEntity', 'activity')
  attendees: UserActivityEntity[];
}
