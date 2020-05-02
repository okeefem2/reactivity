import { Song } from './song';

export interface Lyric {
  id: string;
  likes: number;
  content: string;
  song: Song;
}
