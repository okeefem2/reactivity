import { Lyric } from './lyric';

export interface Song {
  id?: string;
  title: string;
  lyrics?: Lyric[];
}
