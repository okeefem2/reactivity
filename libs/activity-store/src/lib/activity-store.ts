import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext } from 'react';
import { Activity } from '@reactivity/model';
import { list, deleteById, update, create, getById, attend, leave } from '@reactivity/activity-data-client';
import { loadingStore } from '@reactivity/loading-store';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

export interface ActivityGroups {
  [k: string]: Activity[];
}
// ensures that state can only be modified in an action
configure({ enforceActions: 'always' });
class ActivityStore {

  @observable activityRegistry = new Map();
  @observable activity: Activity;

  @computed get activitiesByDate(): Map<string, Activity[]> {
    // TODO look into performance difference between this and regular objects...
    return Array.from(this.activityRegistry.values())
      .reduce((groups: Map<string, Activity[]>, activity) => {
        const date = format(activity.date, 'eeee do MMMM');
        const group = groups.get(date);
        if (group) {
          groups.set(date, [activity, ...group]);
        } else {
          groups.set(date, [activity]);
        }

        return groups;
      }, new Map());
  }

  @action loadActivities = async () => {
    loadingStore.toggleLoading(true, 'Loading Activities');

    try {
      const activities = await list();
      console.log('Activites loaded', activities);
      // this.activities = activities;

      runInAction('Loading Activities', () => {
        activities.forEach(activity => {
          activity && this.activityRegistry.set(activity.id, activity);
        });
      });
    } catch (e) {
      console.log('Error while loading activities', e);
    }

    loadingStore.toggleLoading(false);
  }

  @action createActivity = () => {
    this.activity = undefined;
  }

  @action clearSelectedActivity = () => {
    this.activity = undefined;
  }

  @action loadActivity = async (id: string) => {
    let activity = this.activityRegistry.get(id);

    if (!activity) {
      return this.loadActivityById(id);
    }
    this.activity = { ...activity };
  }

  @action loadActivityById = async (id: string) => {
    console.log('Loading activity');
    loadingStore.toggleLoading(true, `Loading Activity ${id}`);
    try {
      const activity = await getById(id);
      runInAction(() => {
        this.activity = { ...activity };
      });
    } catch (e) {
      console.log('Error while loading activity', e);
    }
    loadingStore.toggleLoading(false);
  }

  @action clearSelectedAndLoading = () => {
    this.activity = undefined;
  }

  @action saveNewActivity = async (activity: Activity): Promise<Activity> => {
    loadingStore.toggleLoading(true, `Creating Activity ${activity.title}`);

    this.clearSelectedAndLoading();
    // this.activities = [...this.activities, activity];
    this.activityRegistry.set(activity.id, activity);

    try {
      activity = await create(activity);
    } catch (e) {
      console.error(e);
      toast.error('Error creating activity!');
      runInAction('Rollback create activity', () => this.activityRegistry.delete(activity.id));
    }
    loadingStore.toggleLoading(false);
    return activity;
  }

  @action deleteActivity = async (id: string) => {
    loadingStore.toggleLoading(true, `Deleting Activity`);

    this.clearSelectedAndLoading();

    // Optimisitic deletion
    const activityToDelete = this.activityRegistry.get(id);
    this.activityRegistry.delete(id);


    try {
      await deleteById(id);
    } catch (e) {
      // Rollback in case of error
      console.error(e);
      toast.error('Error deleting activity!');
      runInAction('Rollback delete activity', () => this.activityRegistry.set(id, activityToDelete));
    }
    loadingStore.toggleLoading(false);
  }

  @action updateActivity = async (activity: Activity): Promise<Activity> => {
    loadingStore.toggleLoading(true, 'Updating Activity')
    this.clearSelectedAndLoading();
    // const activities = [...this.activities];
    // const updateIndex = activities.findIndex(a => a.id === activity.id);
    // const previousActivities = activities.splice(updateIndex, 1, activity);
    // this.activities = [...activities];

    const previousActivity = this.activityRegistry.get(activity.id);
    this.activityRegistry.set(activity.id, activity);

    try {
      activity = await update(activity);
    } catch (e) {
      // Rollback in case of error
      console.error(e);
      toast.error('Error updating activity!');
      // activities.splice(updateIndex, 0, previousActivities[0]);
      // this.activities = [...activities];
      runInAction('Rollback update activity', () => this.activityRegistry.set(activity.id, previousActivity));
    }
    loadingStore.toggleLoading(false);
    return activity;
  }

  @action attendActivity = async (activityId: string): Promise<void> => {
    loadingStore.toggleLoading(true, 'Attending Activity')


    try {
      const activity = await attend(activityId);
      runInAction('Update attendance', () => {
        this.activityRegistry.set(activityId, activity);
        this.activity = activity;
      });
    } catch (e) {
      // Rollback in case of error
      console.error(e);
      toast.error('Error attending activity!');
    }
    loadingStore.toggleLoading(false);
    return;
  }

  @action leaveActivity = async (activityId: string): Promise<void> => {
    loadingStore.toggleLoading(true, 'Leaving Activity')


    try {
      const activity = await leave(activityId);
      debugger;
      runInAction('Update attendance', () => {
        this.activityRegistry.set(activityId, activity);
        this.activity = activity;
      });
    } catch (e) {
      // Rollback in case of error
      console.error(e);
      toast.error('Error leaving activity!');
    }
    loadingStore.toggleLoading(false);
    return;
  }
}

export const activityContext = createContext(new ActivityStore());
