export type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS'

export interface IAxiosRequestConfig {
  url: string,
  method?: Method,
  data?: any,
  params?: any,  // 以URL拼接的形式
  headers?: any, // 指定headers
  responseType?: XMLHttpRequestResponseType,  //
  timeout?:number  // 网络超时时间设置
}


export interface IAxiosResponse{
  data:any,
  status:number,
  statusText:string,
  headers:any,
  config: IAxiosRequestConfig,
  request: any
}


export interface IAxiosPromise extends Promise <IAxiosResponse> {

}

export interface IAxiosError extends Error{
    isAxiosError:boolean,
    config:IAxiosRequestConfig,
    code?:string|null,
    request?:any,
    response?:IAxiosResponse
}
