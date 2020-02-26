import { get, post, postFile, del } from '@reactivity/common';
import { User } from '@reactivity/model';
import { Photo } from 'libs/model/src/lib/photo';
const authApiBase = '/api/auth';
const userApiBase = '/api/user';
const photosApiBase = '/api/photos';
// Note I was lazy and just grouped auth and user data together... Wouldn't do this IRL
// I am just practicing the tech stack!
export function getCurrentUser(): Promise<User> {
  return get<User>(`${authApiBase}`);
}

export function login(user: User): Promise<User> {
  return post<User>(`${authApiBase}/login`, user);
}

export function register(user: User): Promise<User> {
  return post<User>(`${authApiBase}/register`, user);
}

export function getProfile(username: string): Promise<User> {
  return get<User>(`${userApiBase}/${username}`);
}

export function follow(username: string) {
  return post(`${userApiBase}/${username}/follow`, {});
}

export function unfollow(username: string) {
  return del(`${userApiBase}/${username}/follow`);
}

export function getList(username: string, predicate: 'followers' | 'following'): Promise<User[]> {
  return get<User[]>(`${userApiBase}/${username}/${predicate}`);
}

export function uploadProfilePhoto(photo: Blob): Promise<Photo> {
  return postFile<Photo>(`${photosApiBase}`, photo);
}

export function setMainProfilePhoto(photoId: string): Promise<Photo> {
  return post(`${photosApiBase}/${photoId}`, {});
}

export function deleteProfilePhoto(photoId: string): Promise<void> {
  return del(`${photosApiBase}/${photoId}`);
}
