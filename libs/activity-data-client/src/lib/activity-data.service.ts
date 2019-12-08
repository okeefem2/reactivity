import { get, post, put, del } from '@reactivity/common';
import { Activity } from '@reactivity/model';

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

function transform(activity: Activity): Activity {
  return activity && { ...activity, date: new Date(activity.date) };
}
