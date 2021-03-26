import { IAxios, IAxiosPromise, IAxiosRequestConfig, IAxiosResponse, Method, RejectedFn, ResolvedFn } from '../types'
import dispathRequest from './dispathRequest'

import InterceptorManager from './InterceptorManager'
interface Iinterceptors {
  request: InterceptorManager<IAxiosRequestConfig>
  response: InterceptorManager<IAxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class Axios {
  interceptors: Iinterceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<IAxiosRequestConfig>(),
      response: new InterceptorManager<IAxiosResponse>()
    }
  }
  request(url?: any, config?: any): IAxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    const chain: PromiseChain<any>[] = [{
      resolved: dispathRequest,
      rejected: undefined
    }]
    //  request>>>>>>>> <<<<<<<<<response
    this.interceptors.request.forEach(interceptor=>{
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor=>{
      chain.push(interceptor)
    })
    let promise = Promise.resolve(config)

    while(chain.length){
      const { resolved , rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
  }
  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }
  _requestMethodWithoutData(method: Method, url: string, config?: IAxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: IAxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }
}
