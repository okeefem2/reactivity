import React, { SyntheticEvent } from 'react'
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
  createActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string, event: SyntheticEvent<HTMLButtonElement>) => void;
  submitting: boolean;
  loadingTarget: string;
}

export const ActivityDashboardComponent: React.FC<ActivityDashboardProps> =
  ({
    activities,
    selectActivityById,
    selectedActivity,
    editActivity,
    setEditActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    submitting,
  }) => {
    return (
      <div className="activity-dashboard">
        <div className="activity-dashboard__list">
          <ActivityListComponent
            activities={activities}
            selectActivityById={selectActivityById}
            deleteActivity={deleteActivity}
            submitting={submitting}
          />
        </div>
        <div className="activity-dashboard__detail">
          <ActivityDetail activity={selectedActivity} setEditActivity={setEditActivity} />
          {
            editActivity &&
            <ActivityForm
              key={(selectedActivity && selectedActivity.id) || 0}
              activity={selectedActivity}
              setEditActivity={setEditActivity}
              createActivity={createActivity}
              updateActivity={updateActivity}
              submitting={submitting}
            />
          }
        </div>
      </div>
    );
  }
