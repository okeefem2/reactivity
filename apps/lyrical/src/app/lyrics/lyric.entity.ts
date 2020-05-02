import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Lyric } from '@reactivity/model';
import { SongEntity } from '../songs/song.entity';
import { Field, ID, Int, ObjectType, InputType } from '@nestjs/graphql';

@Entity({ name: 'lyric' })
@ObjectType()
export class LyricEntity implements Lyric {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;

  @IsNotEmpty()
  @Column('integer')
  @Field(() => Int)
  readonly likes: number;

  @IsNotEmpty()
  @Column('text')
  @Field()
  readonly content: string;

  @ManyToOne(() => SongEntity, song => song.lyrics)
  @JoinColumn({ name: 'songId' })
  @Field(() => SongEntity)
  song: SongEntity;

  constructor(data?: Partial<LyricEntity>) {
    Object.assign(this, data);
  }
}

@InputType()
export class LyricInput {
  @Field()
  content: string;

  @Field(() => ID)
  songId: string;
}
