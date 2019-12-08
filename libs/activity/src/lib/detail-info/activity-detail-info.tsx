import React from 'react';

import './activity-detail-info.scss';
import { Activity } from '@reactivity/model';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';

/* eslint-disable-next-line */
export interface ActivityDetailInfoProps {
  activity: Activity;
}

export const ActivityDetailInfo = ({ activity }: ActivityDetailInfoProps) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {format(activity.date, 'eeee do MMMM')} at {format(activity.date, 'h:mm a')}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{activity.venue}, {activity.city}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
