import axios, { AxiosResponse } from 'axios';

// setting baseUrl is not needed since we are proxying requests
const responseBody = (response: AxiosResponse) => response.data;
const sleep = (ms: number) =>
  (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms))


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
