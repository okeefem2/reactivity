import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayInit,
  WsResponse,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { Socket, Server } from 'socket.io';
import { CommentEntity } from '@reactivity/entity';

// TODO auth doesn't work...
// @UseGuards(AuthGuard('ws'))
// @UseGuards(AuthGuard('jwt'))
@WebSocketGateway()
export class CommentGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('CommentGatewayLogger');

  @WebSocketServer()
  server: Server;

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
  async getComments(@MessageBody() activityId: string, @ConnectedSocket() client: Socket, ): Promise<WsResponse<void>> {
    this.logger.log('Getting comments for activityId', activityId);
    client.join(activityId);
    const comments = await this.commentService.findByActivityId(activityId);
    this.server.sockets.in(activityId).emit('gotComments', comments);
    return;
  }

  @SubscribeMessage('createComment')
  async createComment(@MessageBody() comment: CommentEntity): Promise<WsResponse<void>> {
    this.logger.log('comment received!', JSON.stringify(comment));
    const savedComment = await this.commentService.save(comment);
    console.log('saved comment', savedComment);
    // How to emit to all
    this.server.emit('commentCreated', savedComment);
    return;
  }

  @SubscribeMessage('deleteComment')
  async deleteComment(@MessageBody() commentId: string): Promise<WsResponse<number>> {
    this.logger.log('Deleting comment', commentId);
    const deleteResult = await this.commentService.delete(commentId);
    return { event: 'deletedComment', data: deleteResult.affected };
  }
}
