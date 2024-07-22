import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type TMainApiResponse = {
  message: string;
  data: any;
};

export type TRoute = {
  movie: "/job" | `/job/${string}`;
  user: "/user" | `/user/${string}`;
  userdata: "/userdata" | `/userdata/${string}`;
  admin: "/admin" | `/admin/${string}`;
  dev: "/dev" | `/dev/${string}`;
  ticket: "/ticket" | `/ticket/${string}`;
  branch: "/branch" | `/branch/${string}`;
  transaction: "/transaction" | `/transaction/${string}`;
  rating: "/rating" | `/rating/${string}`;
};

export interface IMainApi extends AxiosInstance {
  get<T = any, R = AxiosResponse<T>>(
    url: TRoute[keyof TRoute],
    config?: AxiosRequestConfig
  ): Promise<R>;

  delete<T = any, R = AxiosResponse<T>>(
    url: TRoute[keyof TRoute],
    config?: AxiosRequestConfig
  ): Promise<R>;

  post<T = any, R = AxiosResponse<T>>(
    url: TRoute[keyof TRoute],
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;

  put<T = any, R = AxiosResponse<T>>(
    url: TRoute[keyof TRoute],
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;

  patch<T = any, R = AxiosResponse<T>>(
    url: TRoute[keyof TRoute],
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
}
