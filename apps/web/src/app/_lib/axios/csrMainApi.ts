// csrMainApi.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { MAIN_API } from "@/app/_config/config";
import { getCookie } from "cookies-next";

export interface IMainApi extends AxiosInstance {
  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

const csrMainApi = (): IMainApi => {
  const token = getCookie("aauth") || "0";
  const instance = axios.create({
    baseURL: MAIN_API,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return instance as IMainApi;
};

export default csrMainApi;
