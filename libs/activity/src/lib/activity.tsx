import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Activity } from '@reactivity/common';
import { ActivityDashboardComponent } from './dashboard/activity-dashboard';

// Regular React functional component with React hooks
interface ActivityProps {
  createActvity: boolean;
  setCreateActivity: (create: boolean) => void;
}

export const ActivityComponent: React.FC<ActivityProps> =
  ({ createActvity, setCreateActivity }) => {

    const [activities, setActivites] = useState<Activity[]>([]);
    const [selectedActivity, setActivity] = useState<Activity>(undefined);
    const [editActivity, setEditActivity] = useState<boolean>(false);

    const setEditState = (edit: boolean) => {
      if (!edit) {
        setCreateActivity(edit);
      }
      setEditActivity(edit);
    }

    const selectActivityById = (id: string) => {
      if (editActivity || createActvity) {
        setEditState(false);
      }
      setActivity(activities.find(a => a.id === id));
    }

    useEffect(() => {
      if (createActvity) {
        setActivity(undefined);
        setEditActivity(true);
      }
    }, [createActvity]);

    useEffect(() => {
      // axios.get('/api/activity').then((response: AxiosResponse<Activity[]>) => {
      //   const newActivities = [...activities, ...response.data];
      //   setActivites(newActivities);
      // });
      axios.get('/dotnet/activity').then((response: AxiosResponse<Activity[]>) => {
        const newActivities = [...activities, ...response.data];
        setActivites(newActivities);
      });
      // Could use this to clean up connections or something when the component unmounts
      // Like OnDestroy
      // return () => {
      //   cleanup
      // };
    }, []); // Empty array prevents from running multiple times
    // adding params in the array will cause the method to run when that field in the props changes reference
    // like on push change detection!!
    // empty array just means we aren't listening to anything, so run once

    return (
      <ActivityDashboardComponent
        editActivity={editActivity}
        activities={activities}
        selectActivityById={selectActivityById}
        selectedActivity={selectedActivity}
        setEditActivity={setEditState}
      />
    );
  }
