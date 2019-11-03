import React from 'react'
import { ItemGroup, Item, Segment, Label } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';

import './activity-list.scss';

interface ActivityListProps {
  activities: Activity[];
  selectActivityById: (id: string) => void;
}

export const ActivityListComponent: React.FC<ActivityListProps> =
  ({ activities, selectActivityById }) => {
    return (
      <Segment>
        <ItemGroup divided>
          {activities.map((activity: Activity) => (
            <Item key={activity.id}>
              <Item.Image size='tiny' src='/assets/placeholder.png' />

              <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.description}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>{activity.city}</div>
                  <div>{activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                  <div className="activity-list__item-extra">
                    <Label basic content={activity.category} />
                    <button onClick={() => selectActivityById(activity.id)}
                      className="btn btn--pill btn--pill__primary ml10">
                      View
                    </button>
                  </div>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </ItemGroup>
      </Segment>
    );
  }
