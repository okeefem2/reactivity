import { Column, PrimaryColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from './user.entity';

@Entity({ name: 'photo' })
export class PhotoEntity {

  constructor(id, url, isMain, userId) {
    this.id = id;
    this.url = url;
    this.isMain = isMain;
    this.userId = userId;
  }

  @PrimaryColumn('text')
  readonly id: string;

  @IsNotEmpty()
  @Column('text')
  readonly url: string;

  @Column('boolean')
  readonly isMain: boolean;

  @ManyToOne(type => UserEntity, user => user.activities)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  userId: string;
}
