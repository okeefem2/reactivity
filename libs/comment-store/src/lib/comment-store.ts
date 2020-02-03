import { observable, runInAction, action } from 'mobx';
import { createContext } from 'react';
import { loadingStore } from '@reactivity/loading-store';

import { Comment } from '@reactivity/model';
import openSocket from 'socket.io-client';

class CommentStore {
  socket: any;

  constructor() {
    const token = window.localStorage.getItem('jwt');
    // TODO proxy for ws doesn't seem to work...
    this.socket = openSocket('http://localhost:3333', {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    this.socket.on('connect', () => {
      console.log('web socket connected');
    });
    this.socket.on('commentCreated', (comment: Comment) => {
      console.log('commentCreated', comment);
    });
    this.socket.on('gotComments', (comments: Comment[]) => {
      console.log('gotComments', comments);

    });
    this.socket.on('deletedComment', (comments) => {
      console.log('deletedComment', comments);
    });
    this.socket.on('disconnect', () => {
      console.log('web socket disconnected');
    });
    // TODO retry connections
  }

  @observable comments: Comment[];

  @action loadComments = async (activityId: string) => {
    this.socket.emit('getComments', activityId);
  }

  @action createComment = async (comment: Comment) => {
    this.socket.emit('createComment', comment);
  }

  @action deleteComment = async (commentId: string) => {
    this.socket.emit('deleteComment', commentId);
  }
}

export const commentStore = new CommentStore();
export const commentContext = createContext(commentStore);
