import { get, post } from '@reactivity/common';
import { User } from '@reactivity/model';
const apiBase = '/api/auth';

export function getCurrentUser(): Promise<User> {
  return get<User>(`${apiBase}`);
}

export function login(user: User): Promise<User> {
  return post<User>(`${apiBase}/login`, user);
}

export function register(user: User): Promise<User> {
  return post<User>(`${apiBase}/register`, user);
}
