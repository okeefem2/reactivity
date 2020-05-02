import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { SongEntity, SongInput } from './song.entity';
import { SongService } from './song.service';

@Resolver(SongEntity)
export class SongResolver {
  constructor(private readonly songService: SongService) {}
  // Function name is the query name
  @Query(() => SongEntity)
  async song(@Args('id') id: string): Promise<SongEntity> {
    return this.songService.findById(id);
  }

  @Query(() => [SongEntity])
  async songs(): Promise<SongEntity[]> {
    return this.songService.list();
  }

  @Mutation(() => ID)
  async deleteSong(@Args({ name: 'songId', type: () => ID }) songId: string): Promise<void> {
    return this.songService.deleteSong(songId);
  }

  @Mutation(() => SongEntity)
  async addSong(@Args('song') song: SongInput): Promise<SongEntity> {
    return this.songService.addSong(song);
  }
}
