import { observable, action } from 'mobx';
import { createContext } from 'react';
import { Activity } from '@reactivity/common';
import { list, deleteById, update, create } from '@reactivity/activity-data-client';

class ActivityStore {
  @observable activities: any[] = [];
  @observable selectedActivity: Activity;
  @observable loading = false;
  @observable loadingMessage: string;
  @observable editing = false;

  @action loadActivities = () => {
    this.toggleLoading('Loading Activities');
    list().then((activities) => {
      console.log('Activites loaded', activities);
      this.activities = activities;
    }).then(() => this.toggleLoading())
      .catch((e) => {
        console.error(e);
        this.toggleLoading()
      });
  }

  @action toggleLoading = (message = 'Loading') => {
    this.loadingMessage = this.loading ? undefined : message;
    this.loading = !this.loading;
  }

  @action editActivity = (id: string) => {
    this.selectActivityById(id);
    this.editing = true;
  }

  @action cancelEdit = () => {
    this.editing = false;
  }

  @action createActivity = () => {
    this.selectedActivity = undefined;
    this.editing = true;
  }

  @action selectActivityById = (id: string) => {
    this.editing = false;
    this.selectedActivity = this.activities.find(a => a.id === id);
  }

  @action clearSelectedAndLoading = () => {
    this.selectedActivity = undefined;
    this.editing = false;
  }

  @action saveNewActivity = (activity: Activity) => {
    this.toggleLoading(`Creating Activity ${activity.title}`);

    this.clearSelectedAndLoading();
    this.activities = [...this.activities, activity];
    create(activity).then(() => {
      this.toggleLoading();
    }).catch((err) => {
      // Rollback in case of error
      console.error(err);
      const activities = [...this.activities];
      const newActivityIndex = activities.findIndex(a => a.id === activity.id);
      activities.splice(newActivityIndex, 1);
      this.activities = activities;
      this.toggleLoading();
    });
  }

  @action deleteActivity = (id: string) => {
    this.toggleLoading(`Deleting Activity`);

    this.clearSelectedAndLoading();

    // Optimisitic deletion
    const activities = [...this.activities];
    const deleteIndex = activities.findIndex(a => a.id === id);
    const deletedActivities = activities.splice(deleteIndex, 1);
    this.activities = [...activities];
    deleteById(id).then(() => {
      this.toggleLoading();
    }).catch((err) => {
      // Rollback in case of error
      console.error(err);
      activities.splice(deleteIndex, 0, deletedActivities[0]);
      this.activities = activities;
      this.toggleLoading();
    })
  }

  @action updateActivity = (activity: Activity) => {
    this.toggleLoading('Updating Activity')
    this.clearSelectedAndLoading();
    const activities = [...this.activities];
    const updateIndex = activities.findIndex(a => a.id === activity.id);
    const previousActivities = activities.splice(updateIndex, 1, activity);
    this.activities = [...activities];
    update(activity).then(() => {
      this.toggleLoading()
    }).catch((err) => {
      // Rollback in case of error
      console.error(err);
      activities.splice(updateIndex, 0, previousActivities[0]);
      this.activities = [...activities];
      this.toggleLoading()
    });
  }

}

export const activityContext = createContext(new ActivityStore());
