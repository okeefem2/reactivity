import { Module } from '@nestjs/common';

import { LyricsModule } from './lyrics/lyrics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [
    LyricsModule,
    SongsModule,
    TypeOrmModule.forRoot({
      ...config
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [
        LyricsModule,
        SongsModule
      ]
    }),
  ]
})
export class AppModule {}
