import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@reactivity/entity';
import { Repository, DeleteResult } from 'typeorm';
import { WsException } from '@nestjs/websockets';

const COMMENT_NOT_FOUND_ERROR = { errors: { comment: 'Not Found' } };

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) { }

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
      .where('comment.activityId = :activityId', { activityId: activityId }).getMany()
      .then(comments => comments && comments.map(this.addMainPhotoToAuthor));
  }

  save(comment: CommentEntity): Promise<CommentEntity> {
    return this.commentRepository.save(comment);
  }

  async delete(commentId: string): Promise<DeleteResult> {
    const deleteResult = await this.commentRepository.delete(commentId);

    if (deleteResult.affected === 0) {
      throw new WsException(COMMENT_NOT_FOUND_ERROR);
    }
    return deleteResult;
  }

  private addMainPhotoToAuthor(comment: CommentEntity) {
    // YIKES lol
    const mainImage = comment.author && comment.author.photos && comment.author.photos.find(p => p.isMain);

    comment.author = { ...comment.author, image: mainImage && mainImage.url };
    return comment;
  }
}
