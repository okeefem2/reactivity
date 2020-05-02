import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Song } from '@reactivity/model';
import { LyricEntity } from '../lyrics/lyric.entity';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@Entity({ name: 'song' })
@ObjectType()
export class SongEntity implements Song {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @IsNotEmpty()
  @Column('text')
  @Field()
  readonly title: string;

  @OneToMany('LyricEntity', 'song')
  @Field(() => [LyricEntity])
  readonly lyrics: LyricEntity[];

  constructor(data?: Partial<SongEntity>) {
    Object.assign(this, data);
  }
}


@InputType()
export class SongInput {
  @Field()
  title: string;
}
