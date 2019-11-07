import { get, post, put, del } from '@reactivity/api';
import { Activity } from '@reactivity/common';

const apiBase = '/api/activity';
// can also be /dotnet/activity to use the dotnet backend
// TODO i'd like to have both and do loading balancing or something...

export async function list(): Promise<Activity[]> {
  return await get<Activity[]>(`${apiBase}`);
}

export async function getById(id: string): Promise<Activity> {
  return await get<Activity>(`${apiBase}/${id}`);
}

export async function create(activity: Activity): Promise<Activity> {
  return await post<Activity>(`${apiBase}`, activity);
}

export async function update(activity: Activity): Promise<Activity> {
  return await put<Activity>(`${apiBase}/${activity.id}`, activity);
}

export async function deleteById(id: string): Promise<Activity> {
  return await del<Activity>(`${apiBase}/${id}`);
}
