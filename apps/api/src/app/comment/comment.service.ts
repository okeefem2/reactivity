import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@reactivity/entity';
import { Repository, DeleteResult } from 'typeorm';
import { WsException } from '@nestjs/websockets';

const COMMENT_NOT_FOUND_ERROR = { errors: { comment: 'Not Found' } };
const COMMENT_SAVE_FAILED = { errors: { comment: 'Save Failed' } };

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) { }

  // In a real app I would make some form of dynamic query building to limit the amount of hard coded statements
  async findByActivityId(activityId?: string): Promise<CommentEntity[]> {
    return this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('author.photos', 'photo')
      .select([
        'comment',
        'author.username',
        'photo.url',
        'photo.isMain',
      ])
      .where('comment.activityId = :activityId', { activityId: activityId })
      .getMany()
      .then(comments => comments && comments.map(this.addMainPhotoToAuthor));
  }

  async findById(commentId?: string): Promise<CommentEntity> {
    return this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('author.photos', 'photo')
      .select([
        'comment',
        'author.username',
        'photo.url',
        'photo.isMain',
      ])
      .where('comment.id = :commentId', { commentId: commentId }).getOne()
      .then(comment => comment && this.addMainPhotoToAuthor(comment));
  }

  async save(comment: CommentEntity): Promise<CommentEntity> {
    try {
      const savedComment = await this.commentRepository.save(comment);
      console.log('saved comment!', savedComment);
      return await this.findById(comment.id);
    } catch (e) {
      console.log('failed to save comment', e);
      throw new WsException(COMMENT_SAVE_FAILED);
    }
  }

  async delete(commentId: string): Promise<DeleteResult> {
    const deleteResult = await this.commentRepository.delete(commentId);

    if (deleteResult.affected === 0) {
      throw new WsException(COMMENT_NOT_FOUND_ERROR);
    }
    return deleteResult;
  }

  private addMainPhotoToAuthor(comment: CommentEntity): CommentEntity {
    // YIKES lol
    const mainImage = comment.author && comment.author.photos && comment.author.photos.find(p => p.isMain);

    comment.author = { ...comment.author, image: mainImage && mainImage.url };
    return comment;
  }
}
