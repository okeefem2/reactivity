import React, { useContext } from 'react';

import './activity-detail-header.scss';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { Activity } from '@reactivity/model';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { activityContext } from '@reactivity/activity-store';
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
  const activityStore = useContext(activityContext);
  const host = activity.attendees && activity.attendees.find(a => a.isHost);


  return activity && (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image src={`/assets/${activityCategoryImage}`} fluid style={activityImageStyle} />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Image
                size='tiny'
                circular
                src={(host && host.user && host.user.image) || '/assets/user.png'}
                style={{ marginBottom: 3 }}
              />
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{activity.date && format(activity.date, 'eeee do MMMM')}</p>
                <p>
                  {activity.description}
                </p>
                <p>
                  Hosted by <Link to={`/profile/${host && host.user && host.user.username}`}>
                    {host && host.user && host.user.username}
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {
          activity.isHost ?
            <Button color='orange' floated='right' as={Link} to={`/edit-activity/${activity.id}`}>
              Manage Event
            </Button> :
            (
              activity.isGoing ?
                <Button onClick={() => activityStore.leaveActivity(activity.id)}>Cancel attendance</Button> :
                <Button color='teal' onClick={() => activityStore.attendActivity(activity.id)}>Join Activity</Button>
            )
        }

      </Segment>
    </Segment.Group>
  );
};
