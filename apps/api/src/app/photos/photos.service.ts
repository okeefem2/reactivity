import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PhotoEntity } from 'libs/entity/src/lib/photo.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { unlinkSync } from 'fs';
const cloudinary = require('cloudinary').v2;

const PHOTO_NOT_FOUND_ERROR = { errors: { photo: 'Not Found' } };

@Injectable()
export class PhotosService {

  constructor(
    @InjectRepository(PhotoEntity)
    private readonly photoRepository: Repository<PhotoEntity>,
    private readonly configService: ConfigService
  ) { }

  async uploadPhotoForUser(file, userId: string, isMain = true): Promise<PhotoEntity> {
    this.configureCloudinary();
    try {
      const result = await cloudinary.uploader.upload(file, {
        height: 500,
        width: 500,
        crop: 'fill',
        gravity: 'face'
      });
      const photo = new PhotoEntity(result.public_id, result.url, isMain, userId);

      await this.photoRepository.insert(photo);

      console.log('created photo!', photo);

      console.log('clearing uploads dir');

      unlinkSync(file);
      return photo;
    } catch (e) {
      console.error(e);
      throw new HttpException('Failed to upload file!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deletePhoto(photoId: string): Promise<void> {
    this.configureCloudinary();
    try {
      await cloudinary.uploader.destroy(photoId);
      await this.photoRepository.delete(photoId);
      return;
    } catch (e) {
      console.error(e);
      throw new HttpException('Failed to delete photo!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async setMain(photoId: string, userId: string): Promise<PhotoEntity> {
    const updateResult = await this.photoRepository.update(photoId, { isMain: true });
    // TODO set the others to not main
    if (updateResult.affected === 0) {
      throw new HttpException(PHOTO_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    await this.photoRepository.createQueryBuilder()
      .update(PhotoEntity)
      .set({ isMain: false })
      .where('"userId" = :userId', { userId })
      .andWhere('id <> :id', { id: photoId })
      .andWhere('"isMain" = :isMain', { isMain: true })
      .execute();
    return this.photoRepository.findOne(photoId);
  }

  private configureCloudinary() {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET')
    });
  }
}
