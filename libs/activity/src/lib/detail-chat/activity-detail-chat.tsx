import React, { Fragment, useContext, useEffect } from 'react';

import './activity-detail-chat.scss';
import { Activity, Comment as ChatComment } from '@reactivity/model';
import { Segment, Header, Form, Button, Comment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import { TextAreaInput } from '@reactivity/components';
import { observer } from 'mobx-react';
import { commentContext } from '@reactivity/comment-store';
import { userContext } from '@reactivity/user-store';

/* eslint-disable-next-line */
export interface ActivityDetailChatProps {
  activity: Activity;
}

function buildComment(comment: ChatComment) {
  console.log('build comment', comment)
  return comment && comment.author ? (
    <Comment key={comment.id}>
      <Comment.Avatar src={comment.author.image || '/assets/user.png'} />
      <Comment.Content>
        <Comment.Author as={Link} to={`/user/profile/${comment.author.username}`}>{comment.author.username}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.date}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  ) : <></>
}

export const ActivityDetailChat = observer(({ activity }: ActivityDetailChatProps) => {
  const commentStore = useContext(commentContext);
  const comments = commentStore.comments;
  const userStore = useContext(userContext);

  useEffect(() => {
    commentStore.loadComments(activity.id);
  }, [activity]);

  const addComment = (formValue: ChatComment) => {
    formValue.authorId = userStore.currentUser.id;
    formValue.activityId = activity.id;
    formValue.date = new Date();
    return commentStore.createComment(formValue);
  }

  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {activity && comments && comments.map(buildComment)}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field name='body' component={TextAreaInput} rows={2} placeholder='Add your comment' />
                <Button
                  content='Add Reply'
                  labelPosition='left'
                  icon='edit'
                  primary
                />
              </Form>
            )}
          />

        </Comment.Group>
      </Segment>
    </Fragment>
  );
});
