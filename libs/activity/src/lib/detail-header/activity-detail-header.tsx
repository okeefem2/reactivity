import React from 'react';

import './activity-detail-header.scss';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
/* eslint-disable-next-line */
export interface ActivityDetailHeaderProps {
  activity: Activity;
}

export const ActivityDetailHeader = ({ activity }: ActivityDetailHeaderProps) => {

  const activityImageStyle = {
    filter: 'brightness(30%)'
  };

  const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  };

  const activityCategoryImage = activity && activity.category ? `categoryImages/${activity.category.toLowerCase()}.jpg` : 'placeholder.png'

  return activity && (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/${activityCategoryImage}`} fluid style={activityImageStyle} />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date, 'eeee do MMMM')}</p>
                <p>
                  {activity.description}
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        <Button color='teal'>Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color='orange' floated='right' as={Link} to={`/edit-activity/${activity.id}`}>
          Manage Event
            </Button>
      </Segment>
    </Segment.Group>
  );
};
