import { observable, runInAction, action } from 'mobx';
import { createContext } from 'react';
import { loadingStore } from '@reactivity/loading-store';

import { Comment } from '@reactivity/model';
import io from 'socket.io-client';

class CommentStore {
  socket: any;

  constructor() {
    const token = window.localStorage.getItem('jwt');
    // TODO proxy for ws doesn't seem to work...
    this.socket = io('http://localhost:3333', {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    this.socket.on('connect', () => {
      console.log('web socket connected');
    });
    this.socket.on('commentCreated', (comment: Comment) => {
      console.log('commentCreated', comment);
      // THis is crude and insecure I would look into being able to associate the id with the connection and using that on the backend
      if (comment.activityId === this.activityId) {
        runInAction(() => {
          this.comments.push(comment);
        });
      }
    });
    this.socket.on('gotComments', (comments: Comment[]) => {
      console.log('gotComments', comments);
      runInAction(() => {
        this.comments = comments;
      });

    });
    this.socket.on('deletedComment', (comments) => {
      console.log('deletedComment', comments);
      runInAction(() => {
        this.comments = comments;
      });
    });
    this.socket.on('disconnect', () => {
      console.log('web socket disconnected');
    });
    // TODO retry connections
  }

  @observable comments: Comment[];
  @observable activityId: string;

  @action loadComments = (activityId: string) => {
    console.log('fetch comments!', activityId);
    runInAction(() => {
      this.activityId = activityId;
    });
    this.socket.emit('getComments', activityId);
  }

  @action createComment = async (comment: Comment) => {
    console.log('sending comment', comment);
    this.socket.emit('createComment', comment, (comment) => console.log(comment));
  }

  @action deleteComment = async (commentId: string) => {
    this.socket.emit('deleteComment', commentId);
  }
}

export const commentStore = new CommentStore();
export const commentContext = createContext(commentStore);
