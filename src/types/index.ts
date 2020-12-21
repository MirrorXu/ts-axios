export type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS'

export interface IAxiosRequestConfig {
  url: string,
  method?: Method,
  data?: any,
  params?: any,
  headers?: any
}



