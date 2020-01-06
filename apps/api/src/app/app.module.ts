import { Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityModule } from './activity/activity.module';
import { config } from '../config/typeorm.config';
import { LoggingMiddleware } from './middleware/logging-middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserActivityService } from './user-activity/user-activity.service';
import { UserActivityModule } from './user-activity/user-activity.module';

@Module({
  imports: [
    ActivityModule,
    UsersModule,
    UserActivityModule,
    TypeOrmModule.forRoot({
      ...config
    }),
    AuthModule,
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
