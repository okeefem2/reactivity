import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column('text')
  title: string;
  @Column('text')
  description: string;
  @Column('text')
  category: string;
  @Column('date')
  date: Date;
  @Column('text')
  city: string;
  @Column('text')
  venue: string;
}
