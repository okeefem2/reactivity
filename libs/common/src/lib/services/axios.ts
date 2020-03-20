import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { routerHistory } from '../router-history';
import { loadingStore } from '@reactivity/loading-store';
import { userStore } from '@reactivity/user-store';
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
  // IRL would want to check if the token was expired to cause this or if the user is just not allowed
  if (status === 401) {
    userStore.logout();
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

export function get<TResponse = any>(url: string, params?: any): Promise<TResponse> {
  let config = !!params ? { params } : {};
  return axios.get<TResponse>(url, config).then(sleep(1000)).then(responseBody);
}

export function post<TBody = any, TResponse = any>(url: string, body: TBody): Promise<TResponse> {
  return axios.post<TResponse>(url, body).then(sleep(1000)).then(responseBody);
}

export function postFile<TResponse = any>(url: string, file: Blob): Promise<TResponse> {
  let formData = new FormData();
  formData.append('file', file); // Key matches what is expected in the interceptor of photo controller
  return axios.post<TResponse>(url, formData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
    .then(sleep(1000)).then(responseBody);
}

export function put<TBody = any, TResponse = any>(url: string, body: TBody): Promise<TResponse> {
  return axios.put<TResponse>(url, body).then(sleep(1000)).then(responseBody);
}

export function del<TResponse = any>(url) {
  return axios.delete<TResponse>(url).then(sleep(1000)).then(responseBody);
}
