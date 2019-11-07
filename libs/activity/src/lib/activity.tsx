import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Activity } from '@reactivity/common';
import { LoadingComponent } from '@reactivity/components';
import { ActivityDashboardComponent } from './dashboard/activity-dashboard';
import { list, deleteById, update, create } from './agent';

// Regular React functional component with React hooks
interface ActivityProps {
  createActvity: boolean;
  setCreateActivity: (create: boolean) => void;
}

export const ActivityComponent: React.FC<ActivityProps> =
  ({ createActvity, setCreateActivity }) => {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setActivity] = useState<Activity>(undefined);
    const [editActivity, setEditActivity] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [loadingTarget, setLoadingTarget] = useState<string>('');

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

    const createActivity = (activity: Activity) => {
      setSubmitting(true);
      setActivities([...activities, activity]);
      create(activity).then(() => {
        setSubmitting(false);
        setActivity(undefined);
        setEditActivity(false);
      }).catch((err) => {
        // Rollback in case of error
        console.error(err);
        const newActivityIndex = activities.findIndex(a => a.id === activity.id);
        activities.splice(newActivityIndex, 1);
        setActivities([...activities]);
        setSubmitting(false);
      });
    }

    const updateActivity = (activity: Activity) => {
      setSubmitting(true);
      const updateIndex = activities.findIndex(a => a.id === activity.id);
      const previousActivities = activities.splice(updateIndex, 1, activity);
      setActivities([...activities]);
      update(activity).then(() => {
        setSubmitting(false);
        setActivity(undefined);
        setEditActivity(false);
      }).catch((err) => {
        // Rollback in case of error
        console.error(err);
        activities.splice(updateIndex, 0, previousActivities[0]);
        setActivities([...activities]);
        setSubmitting(false);
      });
    }

    const deleteActivity = (id: string, event: SyntheticEvent<HTMLButtonElement>) => {
      setSubmitting(true);
      setLoadingTarget(event.currentTarget.name);
      // Optimisitic deletion
      const deleteIndex = activities.findIndex(a => a.id === id);
      const deletedActivities = activities.splice(deleteIndex, 1);
      setActivities([...activities]);
      deleteById(id).then(() => {
        setSubmitting(false);
        setActivity(undefined);
        setEditActivity(false);
      }).catch((err) => {
        // Rollback in case of error
        console.error(err);
        activities.splice(deleteIndex, 0, deletedActivities[0]);
        setActivities([...activities]);
        setSubmitting(false);
      })
    }

    useEffect(() => {
      if (createActvity) {
        setActivity(undefined);
        setEditActivity(true);
      }
    }, [createActvity]);

    useEffect(() => {
      setLoading(true);
      list().then((activities) => setActivities(activities)).then(() => setLoading(false));
      // Could use this to clean up connections or something when the component unmounts
      // Like OnDestroy
      // return () => {
      //   cleanup
      // };
    }, []); // Empty array prevents from running multiple times
    // adding params in the array will cause the method to run when that field in the props changes reference
    // like on push change detection!!
    // empty array just means we aren't listening to anything, so run once

    if (loading) {
      return (
        <LoadingComponent inverted={false} content={'Loading'} />
      )
    }
    return (
      <ActivityDashboardComponent
        editActivity={editActivity}
        activities={activities}
        selectActivityById={selectActivityById}
        selectedActivity={selectedActivity}
        setEditActivity={setEditState}
        createActivity={createActivity}
        updateActivity={updateActivity}
        deleteActivity={deleteActivity}
        submitting={submitting}
        loadingTarget={loadingTarget}
      />
    );
  }
