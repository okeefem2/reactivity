import React, { useContext, useEffect } from 'react';

import './activity-detail.scss';
import { Grid } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';
import { activityContext } from '@reactivity/activity-store';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { ActivityDetailHeader } from '../detail-header/activity-detail-header';
import { ActivityDetailInfo } from '../detail-info/activity-detail-info';
import { ActivityDetailChat } from '../detail-chat/activity-detail-chat';
import { ActivityDetailSidebar } from '../detail-sidebar/activity-detail-sidebar';

export interface ActivityDetailProps {
  activity: Activity
}

interface ActivityDetailParams {
  id: string;
}

export const ActivityDetail: React.FC<RouteComponentProps<ActivityDetailParams>> =
  observer(({ match, history }) => {
    const activityStore = useContext(activityContext);

    useEffect(() => {
      activityStore.loadActivity(match.params.id);
      // .catch(e => {
      //   history.push('/notfound');
      // });
    }, []);

    const activity = activityStore.activity;

    return activity ? (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailHeader activity={activity}></ActivityDetailHeader>
          <ActivityDetailInfo activity={activity}></ActivityDetailInfo>
          <ActivityDetailChat activity={activity}></ActivityDetailChat>
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailSidebar activity={activity}></ActivityDetailSidebar>
        </Grid.Column>
      </Grid>
    ) : (
        <h2>
          Activity Not Found
      </h2>
      );
  });
