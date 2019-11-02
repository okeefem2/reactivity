import React from 'react'
import { List } from 'semantic-ui-react';
import { Activity } from '@reactivity/common';
import { ActivityListComponent } from '../list/activity-list';

import './activity-dashboard.scss';

interface ActivityDashboardProps {
  activities: Activity[];
}

export const ActivityDashboardComponent: React.FC<ActivityDashboardProps> = ({ activities }) => {
  return (
    <div className="activity-dashboard">
      <div className="activity-dashboard__list">
        <ActivityListComponent activities={activities} />
      </div>
    </div>
  );
}
