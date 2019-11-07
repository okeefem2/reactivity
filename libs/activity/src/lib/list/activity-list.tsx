import React, { SyntheticEvent } from 'react'
import { ItemGroup, Item, Segment, Label, Loader } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';

import './activity-list.scss';

interface ActivityListProps {
  activities: Activity[];
  selectActivityById: (id: string) => void;
  deleteActivity: (id: string, event: SyntheticEvent<HTMLButtonElement>) => void;
  submitting: boolean;
  loadingTarget: string;
}

export const ActivityListComponent: React.FC<ActivityListProps> =
  ({
    activities,
    selectActivityById,
    deleteActivity,
    submitting,
    loadingTarget,
  }) => {
    return (
      <Segment>
        <ItemGroup divided>
          {activities.map((activity: Activity) => (
            <Item key={activity.id}>
              <Item.Image size='tiny' src='/assets/placeholder.png' />

              <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                  <div>{activity.description}</div>
                  <div>{activity.city}</div>
                  <div>{activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                  <div className="activity-list__item-extra">
                    <Label basic content={activity.category} />
                    <div>
                      <button onClick={() => selectActivityById(activity.id)}
                        className="btn btn--pill btn--pill__primary ml10">
                        View
                      </button>
                      <button onClick={(e) => deleteActivity(activity.id, e)}
                        name={activity.id}
                        className="btn btn--pill btn--pill__danger ml10">
                        Delete <Loader active={submitting && activity.id === loadingTarget} />
                      </button>
                    </div>
                  </div>
                </Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </ItemGroup>
      </Segment>
    );
  }
