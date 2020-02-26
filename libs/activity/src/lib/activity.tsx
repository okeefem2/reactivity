import React, { useEffect, useContext } from 'react';
import { LoadingComponent } from '@reactivity/components';
import { ActivityDashboardComponent } from './dashboard/activity-dashboard';
import { activityContext, DEFAULT_PAGE_SIZE } from '@reactivity/activity-store';
import { observer } from 'mobx-react-lite';

// Regular React functional compo../../../activity-store/src/lib/activity-storehooks

export const ActivityComponent: React.FC =
  observer(() => {
    const activityStore = useContext(activityContext);

    useEffect(() => {
      activityStore.setPagingOptions({ page: 0, take: DEFAULT_PAGE_SIZE });
    }, []);

    return (
      <ActivityDashboardComponent />
    );
  });
