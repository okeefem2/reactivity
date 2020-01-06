import React, { useContext } from 'react'
import { Item, Segment, Label, Icon } from 'semantic-ui-react';

import { activityContext } from '@reactivity/activity-store';
import { Link } from 'react-router-dom';

import './activity-list-item.scss';
import { Activity } from '@reactivity/model';
import { format } from 'date-fns';
import ActivityListItemAttendees from '../list-item-attendees/activity-list-item-attendees';

export interface ActivityListItemProps {
  activity: Activity;
}

export const ActivityListItem = ({ activity }) => {
  const activityStore = useContext(activityContext);
  const host = activity.attendees && activity.attendees.find(a => a.isHost);

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src={(host && host.user && host.user.image) || `/assets/placeholder.png`} />

            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
              <Item.Description>
                Hosted By {host && host.user && host.user.username}
              </Item.Description>
              {
                activity.isHost &&
                <Item.Description>
                  <Label basic color='orange' content='You are hosting this activity' />
                </Item.Description>
              }

              {
                !activity.isHost && activity.isGoing &&
                <Item.Description>
                  <Label basic color='green' content='You are going to this activity' />
                </Item.Description>
              }

              <Item.Extra>
                <div className="activity-list__item-extra">
                  <Label basic content={activity.category} />
                  <div>
                  </div>
                </div>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>

      </Segment>
      <Segment>
        <Icon name='clock' /> {format(activity.date, 'h:mm a')}
        <Icon name='marker' /> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment>
        <span>{activity.description}</span>
        <Link to={`/activity/${activity.id}`}>
          <button
            className="btn btn--pill btn--pill__primary ml10">
            View
          </button>
        </Link>
        <button onClick={() => activityStore.deleteActivity(activity.id)}
          name={activity.id}
          className="btn btn--pill btn--pill__danger ml10">
          Delete
                      </button>
      </Segment>
    </Segment.Group>
  );
};
