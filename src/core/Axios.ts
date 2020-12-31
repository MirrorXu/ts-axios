import { IAxiosPromise, IAxiosRequestConfig, Method } from '../types'
import dispathRequest from './dispathRequest'
export default class Axios {
  request(url?: any, config?: any): IAxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispathRequest(config)
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
