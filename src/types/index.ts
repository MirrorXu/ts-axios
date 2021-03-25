export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

export interface IAxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any // 以URL拼接的形式
  headers?: any // 指定headers
  responseType?: XMLHttpRequestResponseType //
  timeout?: number // 网络超时时间设置
}

export interface IAxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}

export interface IAxiosPromise<T = any> extends Promise<IAxiosResponse> {}

export interface IAxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
}

export interface IAxios {
  request<T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  get<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  head<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  delete<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  options<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

export interface IAxiosInstance extends IAxios {
  <T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  <T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
}


export interface IAxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected: RejectedFn):number
  eject(id:number):void
}

export interface ResolvedFn<T>{
  (val:T):T|Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
