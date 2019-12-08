import axios, { AxiosResponse } from 'axios';
import { routerHistory } from '../router-history';
import { loadingStore } from '@reactivity/loading-store';
import { toast } from 'react-toastify';

// setting baseUrl is not needed since we are proxying requests
const responseBody = (response: AxiosResponse) => response && response.data;
const sleep = (ms: number) =>
  (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('jwt');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
}, error => {
  console.log(error);
  Promise.reject(error);
});

axios.interceptors.response.use(undefined, (error) => {
  console.log('Http Error', error);
  const { status, data, config } = error.response;
  if (status === 404) {
    routerHistory.push('/notfound');
  }
  if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
    routerHistory.push('/notfound');
  }
  if (status === 500 || status === 504) {
    toast.error('Server Error!');
  }
  loadingStore.toggleLoading(false);
  throw error.response;
});

export function get<TResponse = any>(url: string): Promise<TResponse> {
  return axios.get<TResponse>(url).then(sleep(1000)).then(responseBody);
}

export function post<TBody = any, TResponse = any>(url: string, body: TBody): Promise<TResponse> {
  return axios.post<TResponse>(url, body).then(sleep(1000)).then(responseBody);
}

export function put<TBody = any, TResponse = any>(url: string, body: TBody): Promise<TResponse> {
  return axios.put<TResponse>(url, body).then(sleep(1000)).then(responseBody);
}

export function del<TResponse = any>(url) {
  return axios.delete<TResponse>(url).then(sleep(1000)).then(responseBody);
}
