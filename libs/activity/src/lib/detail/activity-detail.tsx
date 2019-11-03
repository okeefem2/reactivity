import React from 'react';

import './activity-detail.scss';
import { Card, Image, Icon, ButtonGroup, Button } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';

export interface ActivityDetailProps {
  activity: Activity
  setEditActivity: (edit: boolean) => void;
}

export const ActivityDetail =
  ({ activity, setEditActivity }: ActivityDetailProps) => {
    return activity ? (
      <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            <div>{activity.description}</div>
            <div>{activity.city}</div>
            <div>{activity.venue}</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="btn--group">
            <button
              className="btn btn--outline btn--outline__primary"
              onClick={() => setEditActivity(true)}>
              Edit
          </button>
            <button
              className="btn btn--outline btn--outline__grey"
              onClick={() => setEditActivity(false)}>
              Cancel
          </button>
          </div>
        </Card.Content>
      </Card>
    ) : (
        <h2>
          Select an Activity to View
      </h2>
      );
  };

export default ActivityDetail;
