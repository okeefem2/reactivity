import { get, post, put, del } from '@reactivity/common';
import { Activity } from '@reactivity/common';

const apiBase = '/api/activity';
// const apiBase = '/dotnet/activity';
// can also be /dotnet/activity to use the dotnet backend
// TODO i'd like to have both and do loading balancing or something...

export function list(): Promise<Activity[]> {
  return get<Activity[]>(`${apiBase}`);
}

export function getById(id: string): Promise<Activity> {
  return get<Activity>(`${apiBase}/${id}`);
}

export function create(activity: Activity): Promise<Activity> {
  return post<Activity>(`${apiBase}`, activity);
}

export function update(activity: Activity): Promise<Activity> {
  return put<Activity>(`${apiBase}/${activity.id}`, activity);
}

export function deleteById(id: string): Promise<Activity> {
  return del<Activity>(`${apiBase}/${id}`);
}
