import { Test, TestingModule } from '@nestjs/testing';
import { LyricsResolver } from './lyrics.resolver';

describe('LyricsResolver', () => {
  let resolver: LyricsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LyricsResolver],
    }).compile();

    resolver = module.get<LyricsResolver>(LyricsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
