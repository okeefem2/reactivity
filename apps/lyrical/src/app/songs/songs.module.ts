import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from './song.entity';
import { SongResolver } from './song.resolver';
import { SongService } from './song.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SongEntity
    ]),
  ],
  exports: [
    TypeOrmModule,
    SongService,
  ],
  providers: [SongResolver, SongService]
})
export class SongsModule {}
