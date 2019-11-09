import React, { useContext } from 'react'
import { ActivityListComponent } from '../list/activity-list';

import './activity-dashboard.scss';
import { observer } from 'mobx-react';
import { activityContext } from '@reactivity/activity-store';
import { ActivityDetail } from '../detail/activity-detail';
import { ActivityForm } from '../form/activity-form';
// interface ActivityDashboardProps {
//   activities: Activity[];
// }
export const ActivityDashboardComponent: React.FC =
  observer(() => {

    const activityStore = useContext(activityContext);

    return (
      <div className="activity-dashboard">
        <div className="activity-dashboard__list">
          <ActivityListComponent activities={activityStore.activities} />
        </div>
        <div className="activity-dashboard__detail">
          <ActivityDetail activity={activityStore.selectedActivity} />
          {
            activityStore.editing &&
            <ActivityForm
              key={(activityStore.selectedActivity && activityStore.selectedActivity.id) || 0}
              activity={activityStore.selectedActivity}
            />
          }
        </div>
      </div>
    );
  });
