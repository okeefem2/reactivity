import React, { Fragment, useContext } from 'react';

import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';
import './activity-filters.scss';
import { activityContext } from '@reactivity/activity-store';
import { observer } from 'mobx-react';

const ActivityFilters = observer(() => {
  const activityStore = useContext(activityContext);
  const filterOptions = activityStore.filterOptions;

  const allActivities = (!filterOptions.attending && !filterOptions.date && !filterOptions.hosting);

  return (
    <Fragment>
      <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
        <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
        <Menu.Item
          active={allActivities}
          color={'blue'}
          name={'all'}
          content={'All Activities'}
          onClick={() => activityStore.setFilterOptions({})}
        />
        <Menu.Item
          onClick={() => activityStore.setFilterOptions({ ...filterOptions, attending: !filterOptions.attending })}
          active={filterOptions.attending}
          color={'blue'}
          name={'username'}
          content={"I'm Going"} />
        <Menu.Item
          onClick={() => activityStore.setFilterOptions({ ...filterOptions, hosting: !filterOptions.hosting })}
          active={filterOptions.hosting}
          color={'blue'} name={'host'}
          content={"I'm hosting"} />
      </Menu>
      <Header icon={'calendar'} attached color={'teal'} content={'Select Date'} />
      <Calendar
        onChange={(date) => activityStore.setFilterOptions({ ...filterOptions, date })}
        value={filterOptions.date}
      />
    </Fragment>
  )
});

export default ActivityFilters;
