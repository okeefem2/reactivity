import React from 'react'
import { Activity } from '@reactivity/common';
import { ActivityListComponent } from '../list/activity-list';

import './activity-dashboard.scss';
import ActivityDetail from '../detail/activity-detail';
import ActivityForm from '../form/activity-form';

interface ActivityDashboardProps {
  activities: Activity[];
  selectedActivity: Activity;
  selectActivityById: (id: string) => void;
  editActivity: boolean,
  setEditActivity: (edit: boolean) => void;
}

export const ActivityDashboardComponent: React.FC<ActivityDashboardProps> =
  ({ activities, selectActivityById, selectedActivity, editActivity, setEditActivity }) => {
    return (
      <div className="activity-dashboard">
        <div className="activity-dashboard__list">
          <ActivityListComponent activities={activities} selectActivityById={selectActivityById} />
        </div>
        <div className="activity-dashboard__detail">
          <ActivityDetail activity={selectedActivity} setEditActivity={setEditActivity}/>
          {editActivity && <ActivityForm activity={selectedActivity} setEditActivity={setEditActivity} />}
        </div>
      </div>
    );
  }
