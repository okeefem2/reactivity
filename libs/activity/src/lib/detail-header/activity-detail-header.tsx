import React from 'react';

import './activity-detail-header.scss';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';

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

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/categoryImages/${activity.category.toLowerCase()}.jpg`} fluid style={activityImageStyle} />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{activity.date}</p>
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
        <Button color='orange' floated='right'>
          Manage Event
            </Button>
      </Segment>
    </Segment.Group>
  );
};
