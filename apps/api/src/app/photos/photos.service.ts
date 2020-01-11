import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PhotoEntity } from 'libs/entity/src/lib/photo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

const cloudinary = require('cloudinary').v2;

@Injectable()
export class PhotosService {

  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
    private readonly configService: ConfigService
  ) { }

  async uploadPhotoForUser(file, userId: string, isMain = true): Promise<PhotoEntity> {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET')
    });
    try {
      const result = await cloudinary.uploader.upload(file);
      const photo = new PhotoEntity(result.public_id, result.url, isMain, userId);

      await this.photoRepository.insert(photo);

      console.log('created photo!', photo);

      console.log('clearing uploads dir');



      return photo;
    } catch (e) {
      console.error(e);
      throw new HttpException('Failed to upload file!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
