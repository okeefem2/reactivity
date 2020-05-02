import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LyricEntity } from './lyric.entity';
import { LyricsResolver } from './lyrics.resolver';
import { LyricsService } from './lyrics.service';
import { SongsModule } from '../songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LyricEntity
    ]),
    SongsModule,
  ],
  exports: [
    TypeOrmModule
  ],
  providers: [LyricsResolver, LyricsService]
})
export class LyricsModule {}
