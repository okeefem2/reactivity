import React, { useContext, useState, useEffect } from 'react'
import { ActivityListComponent } from '../list/activity-list';

import './activity-dashboard.scss';
import { observer } from 'mobx-react';
import { activityContext } from '@reactivity/activity-store';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from '../filters/activity-filters';

export const ActivityDashboardComponent: React.FC =
  observer(() => {

    const activityStore = useContext(activityContext);

    const handleGetNext = () => {
      const currentOptions = activityStore.pagingOptions;
      console.log('get next');
      activityStore.setPagingOptions({ ...currentOptions, page: currentOptions.page + 1 });
    }

    return (
      <div className="activity-dashboard">
        <div className="activity-dashboard__list">
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!activityStore.loadingNextPage && activityStore.currentPage + 1 <= activityStore.totalPages}
            initialLoad={false}
          >
            <ActivityListComponent activityGroups={activityStore.activitiesByDate} />
          </InfiniteScroll>
        </div>

        <div className="activity-dashboard__detail">
          <ActivityFilters />
        </div>
      </div>
    );
  });
