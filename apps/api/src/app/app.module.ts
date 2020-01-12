import { Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityModule } from './activity/activity.module';
import { config } from '../config/typeorm.config';
import { LoggingMiddleware } from './middleware/logging-middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserActivityModule } from './user-activity/user-activity.module';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
@Module({
  imports: [
    ActivityModule,
    UsersModule,
    UserActivityModule,
    TypeOrmModule.forRoot({
      ...config
    }),
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: './apps/api/src/config/.env',
    }),
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: import("@nestjs/common").MiddlewareConsumer) {
    // https://docs.nestjs.com/middleware
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
