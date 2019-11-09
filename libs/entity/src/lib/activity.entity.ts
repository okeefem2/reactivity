import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity({ name: 'Activity' })
export class ActivityEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  @Column('text')
  category: string;
  @Column('date')
  date: Date | string;
  @Column('text')
  city: string;
  @Column('text')
  venue: string;
}
