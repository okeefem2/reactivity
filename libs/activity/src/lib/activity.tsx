import React, { useEffect, useContext } from 'react';
import { LoadingComponent } from '@reactivity/components';
import { ActivityDashboardComponent } from './dashboard/activity-dashboard';
import { activityContext } from '@reactivity/activity-store';
import { observer } from 'mobx-react-lite';
// Regular React functional compo../../../activity-store/src/lib/activity-storehooks

export const ActivityComponent: React.FC =
  observer(() => {
    const activityStore = useContext(activityContext);

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore]);

    // useEffect(() => {
    //   if (createActvity) {
    //     setActivity(undefined);
    //     setEditActivity(true);
    //   }
    // }, [createActvity]);

    // useEffect(() => {
    //   setLoading(true);
    //   list().then((activities) => setActivities(activities)).then(() => setLoading(false));
    //   // Could use this to clean up connections or something when the component unmounts
    //   // Like OnDestroy
    //   // return () => {
    //   //   cleanup
    //   // };
    // }, []); // Empty array prevents from running multiple times
    // adding params in the array will cause the method to run when that field in the props changes reference
    // like on push change detection!!
    // empty array just means we aren't listening to anything, so run once

    if (activityStore.loading) {
      return (
        <LoadingComponent inverted={false} content={activityStore.loadingMessage} />
      )
    }
    return (
      <ActivityDashboardComponent />
    );
  });
