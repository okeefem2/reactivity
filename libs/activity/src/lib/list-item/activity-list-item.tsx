import React, { useContext } from 'react'
import { Item, Segment, Label, Icon } from 'semantic-ui-react';

import { activityContext } from '@reactivity/activity-store';
import { Link } from 'react-router-dom';

import './activity-list-item.scss';
import { Activity } from '@reactivity/model';
import { format } from 'date-fns';

export interface ActivityListItemProps {
  activity: Activity;
}

export const ActivityListItem = ({ activity }) => {
  const activityStore = useContext(activityContext);

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src='/assets/placeholder.png' />

            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Description>
                Hosted By Michael!
            </Item.Description>
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
        Attendees
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
