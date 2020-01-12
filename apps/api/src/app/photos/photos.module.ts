import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { PhotoEntity } from 'libs/entity/src/lib/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      PhotoEntity
    ]),
    UsersModule,
  ],
  providers: [PhotosService, ConfigService],
  controllers: [PhotosController],
  exports: [
    TypeOrmModule,
    PhotosService
  ]
})
export class PhotosModule { }
