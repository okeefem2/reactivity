import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SongEntity, SongInput } from './song.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(SongEntity)
    private readonly songRepository: Repository<SongEntity>,
  ) {}

  async list(): Promise<SongEntity[]> {
    return this.songRepository.find();
  }

  async findById(id: string): Promise<SongEntity> {
    return this.songRepository.findOne(id, { relations: [ 'lyrics' ]});
  }

  async addSong(song: SongInput): Promise<SongEntity> {
    // TODO IRL would check if title already exists or something
    const newSong = await this.songRepository.create(song);
    return this.songRepository.save(newSong);
  }

  async deleteSong(id: string): Promise<void> {
    try {
      await this.songRepository.delete(id);
      return;
    } catch (e) {
      throw new HttpException('Failed to find and delete song', HttpStatus.NOT_FOUND);
    }
  }
}
