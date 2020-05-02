import { ConnectionOptions } from 'typeorm';
import {
  ActivityEntity,
  UserEntity,
  UserActivityEntity,
  PhotoEntity,
  CommentEntity,
  UserFollowingEntity,
} from '@reactivity/entity';
import { LyricEntity } from '../app/lyrics/lyric.entity';
import { SongEntity } from '../app/songs/song.entity';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...


// Check typeORM documentation for more information.
export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'reactivitydev',
  database: 'lyricalnest',
  synchronize: true,
  logging: true,
  logger: 'file',
  entities: [
    LyricEntity,
    SongEntity,
  ]
};
