import React, { Fragment } from 'react';

import './activity-detail-sidebar.scss';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { UserActivity } from 'libs/model/src/lib/user-activity';

/* eslint-disable-next-line */
export interface ActivityDetailSidebarProps {
  attendees: UserActivity[];
}

export const ActivityDetailSidebar = ({ attendees }: ActivityDetailSidebarProps) => {
  return attendees ? (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
          </Segment>
      <Segment attached>
        <List relaxed divided>
          {
            attendees.map((attendee) => (
              <Item key={attendee.user.username} style={{ position: 'relative' }}>
                {
                  attendee.isHost &&
                  <Label
                    style={{ position: 'absolute' }}
                    color='orange'
                    ribbon='right'
                  >
                    Host
                  </Label>
                }
                <Image size='tiny' src={attendee.user.image || '/assets/user.png'} />
                <Item.Content verticalAlign='middle'>
                  <Item.Header as='h3'>
                    <Link to={`/profile/${attendee.user.username}`}>{attendee.user.username} </Link>
                  </Item.Header>
                  {attendee.user.isFollowed && <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}

                </Item.Content>
              </Item>
            ))
          }
        </List>
      </Segment>
    </Fragment>
  ) : <></>;
};
