import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LyricEntity, LyricInput } from './lyric.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Lyric } from '@reactivity/model';
import { SongService } from '../songs/song.service';

@Injectable()
export class LyricsService {
  constructor(
    @InjectRepository(LyricEntity)
    private readonly lyricRepository: Repository<LyricEntity>,
    private readonly songService: SongService,
  ) {}

  async findById(id: string): Promise<LyricEntity> {
    return this.lyricRepository.findOne(id, { relations: [ 'song' ]});
  }

  async addLyric(lyric: LyricInput): Promise<LyricEntity> {
    const song = await this.songService.findById(lyric.songId);
    if (!song) {
      throw new HttpException('Failed to find song', HttpStatus.NOT_FOUND);
    }

    const newLyric = this.lyricRepository.create({ likes: 0, content: lyric.content, song });
    return this.lyricRepository.save(newLyric);
  }

  async likeLyric(id: string): Promise<number> {
    const lyric = await this.findById(id);
    if (!lyric) {
      throw new HttpException('Failed to find lyric', HttpStatus.NOT_FOUND);
    }
    const likes = lyric.likes + 1;
    try {
      await this.lyricRepository.update({ likes }, { id });
      return likes;
    } catch (e) {
      throw new HttpException('Failed to like lyric', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
