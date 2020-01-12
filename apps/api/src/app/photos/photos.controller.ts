import { Controller, Post, Request, UseInterceptors, UploadedFile, UseGuards, Delete, Param } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotoEntity } from 'libs/entity/src/lib/photo.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(AuthGuard('jwt'))
@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly usersService: UsersService
  ) { }

  // Have to use disk storage to be able to get a path... so after uploading then need to clean out the uploads folder
  // SO stupid, would never use cloudinary in a real project, need a service that can accept a bugger
  @Post()
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            return cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }
    )
  )
  async addPhoto(@Request() req, @UploadedFile() file): Promise<PhotoEntity> {
    console.log('fie', file);
    const user = await this.usersService.getProfile(req.user.username);
    return this.photosService.uploadPhotoForUser(file.path, user.id, !user.image);
  }

  @Delete(':id')
  deletePhoto(@Param('id') id: string): Promise<void> {
    return this.photosService.deletePhoto(id);
  }
}
