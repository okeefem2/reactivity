import { Resolver, Query, Args, Int, ID, Mutation } from '@nestjs/graphql';
import { LyricEntity, LyricInput } from './lyric.entity';
import { LyricsService } from './lyrics.service';

@Resolver(LyricEntity)
export class LyricsResolver {
  constructor(private readonly lyricService: LyricsService) {}
  // Function name is the query name
  @Query(() => LyricEntity)
  async lyric(@Args('id') id: string): Promise<LyricEntity> {
    return this.lyricService.findById(id);
  }

  @Mutation(() => Int)
  async likeLyric(@Args({ name: 'lyricId', type: () => ID }) lyricId: string): Promise<number> {
    return this.lyricService.likeLyric(lyricId);
  }

  @Mutation(() => LyricEntity)
  async addLyric(@Args({ name: 'lyric', type: () => LyricInput }) lyric: LyricInput): Promise<LyricEntity> {
    return this.lyricService.addLyric(lyric);
  }
}
