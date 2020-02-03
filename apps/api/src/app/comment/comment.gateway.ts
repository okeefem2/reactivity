import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayInit,
  WsResponse,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { Socket, Server } from 'socket.io';
import { CommentEntity } from '@reactivity/entity';

// @UseGuards(AuthGuard('ws'))
@UseGuards(AuthGuard('jwt'))
@WebSocketGateway()
export class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('CommentGatewayLogger');

  constructor(private readonly commentService: CommentService) { }

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Connected!', client.id);
    this.logger.log('Connected!', client.id);
  }
  handleDisconnect(client: Socket) {
    this.logger.log('Disconnected!', client.id);
  }

  @SubscribeMessage('getComments')
  async getComments(@ConnectedSocket() client: Socket, activityId: string): Promise<WsResponse<CommentEntity[]>> {
    this.logger.log('Getting comments for activityId', activityId);
    const comments = await this.commentService.findByActivityId(activityId);
    return { event: 'gotComments', data: comments };
  }

  @SubscribeMessage('createComment')
  async onComment(@ConnectedSocket() client: Socket, comment: CommentEntity): Promise<WsResponse<CommentEntity>> {
    this.logger.log('comment received!');
    const savedComment = await this.commentService.save(comment);
    return { event: 'commentCreated', data: savedComment };
  }

  @SubscribeMessage('deleteComment')
  async deleteComment(@ConnectedSocket() client: Socket, commentId: string): Promise<WsResponse<number>> {
    this.logger.log('Deleting comment', commentId);
    const deleteResult = await this.commentService.delete(commentId);
    return { event: 'deletedComment', data: deleteResult.affected };
  }
}
