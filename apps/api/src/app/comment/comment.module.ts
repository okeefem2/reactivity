import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '@reactivity/entity';
import { CommentGateway } from './comment.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity
    ])
  ],
  providers: [
    CommentService,
    CommentGateway,
  ],
  exports: [
    TypeOrmModule,
  ]
})
export class CommentModule { }
