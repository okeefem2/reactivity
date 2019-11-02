import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Activity } from '@reactivity/common';
import { ActivityDashboardComponent } from './dashboard/activity-dashboard';

// Regular React functional component with React hooks

export const ActivityComponent = () => {

  const [activities, setActivites] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get('/api/activity').then((response: AxiosResponse<Activity[]>) => {
      const newActivities = [...activities, ...response.data];
      setActivites(newActivities);
    });
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
    <ActivityDashboardComponent activities={activities} />
  );
}
