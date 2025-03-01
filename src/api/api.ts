export const baseURL = process.env.NEXT_PUBLIC_API_URL;

import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axios = Axios.create({ baseURL });

const _getHeader = (config?: AxiosRequestConfig) => {
  return {
    ...(config && config),
    headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
  };
};

export function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const options = _getHeader(config);
  return axios.get(url, options);
}

export function post<T = any>(
  url: string,
  data: any,
  options?: any
): Promise<AxiosResponse<T>> {
  const baseHeaders = _getHeader()['headers'];
  const extraHeaders = options?.['headers'] ?? {};
  const headers = { ...baseHeaders, ...extraHeaders };
  return axios.post(url, data, { ...options, headers });
}

export const deleteCall = (url: string, data?: any) => {
  const options = _getHeader();
  return axios.delete(url, { ...options, data });
};

export function patch<T = any>(
  url: string,
  data: any
): Promise<AxiosResponse<T>> {
  const options = _getHeader();
  return axios.patch(url, data, options);
}

export const put = <T = any>(
  url: string,
  data: any
): Promise<AxiosResponse<T>> => {
  const options = _getHeader();
  return axios.put(url, data, options);
};
