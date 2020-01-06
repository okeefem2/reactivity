import { get, post, put, del } from '@reactivity/common';
import { Activity } from '@reactivity/model';
import { userStore } from '@reactivity/user-store';
const apiBase = '/api/activity';
// const apiBase = '/dotnet/activity';
// can also be /dotnet/activity to use the dotnet backend
// TODO i'd like to have both and do loading balancing or something...

export function list(): Promise<Activity[]> {
  return get<Activity[]>(`${apiBase}`).then((activities) => activities.map(transform));
}

export function getById(id: string): Promise<Activity> {
  return get<Activity>(`${apiBase}/${id}`).then(transform);
}

export function create(activity: Activity): Promise<Activity> {
  return post<Activity>(`${apiBase}`, activity).then(transform);
}

export function update(activity: Activity): Promise<Activity> {
  return put<Activity>(`${apiBase}/${activity.id}`, activity).then(transform);
}

export function deleteById(id: string): Promise<Activity> {
  return del<Activity>(`${apiBase}/${id}`).then(transform);
}

export function attend(id: string): Promise<Activity> {
  return post<Activity>(`${apiBase}/${id}/attend`, null).then(transform);
}

export function leave(id: string): Promise<Activity> {
  return del<Activity>(`${apiBase}/${id}/attend`).then(transform);
}

function transform(activity: Activity): Activity {
  const user = userStore.currentUser;
  if (!activity || !user) return;
  activity = {
    ...activity,
    date: new Date(activity.date),
  };

  if (activity.attendees) {
    activity = {
      ...activity,
      ...activity.attendees.reduce((agg, a) => {
        if (a.user.username === user.username) {
          return { isGoing: true, isHost: a.isHost };
        }
        return agg;
      }, { isGoing: false, isHost: false }),
    }
  }
  return activity;
}
