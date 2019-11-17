import React, { Fragment, ReactNode } from 'react'
import { ItemGroup, Segment, Label } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';

import './activity-list.scss';
import { ActivityListItem } from '../list-item/activity-list-item';
import { ActivityGroups } from '@reactivity/activity-store';

interface ActivityListProps {
  activityGroups: Map<string, Activity[]>;
}

export const ActivityListComponent: React.FC<ActivityListProps> =
  ({
    activityGroups,
  }) => {
    console.log(activityGroups);

    const buildActivityList = ([date, activities]: [string, Activity[]]): ReactNode => {
      return (
        <div key={date} className='activity-list--group mt10'>
          <Label size='large' color='blue'>
            {date}
          </Label>
          <ItemGroup divided>

            {
              activities.map((activity: Activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))
            }
          </ItemGroup>
        </div>
      );
    };

    const activitiesByDate = Array.from(activityGroups.entries());


    return (
      <Fragment>
        {
          activitiesByDate.map(buildActivityList)
        }
      </Fragment>
    );
  }
