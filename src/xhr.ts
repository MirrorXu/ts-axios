import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from './types/index'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType } = config

    // 生成xhr实例
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    // 指定responseType
    if (responseType) {
      request.responseType = responseType
    }

    // 设置请求 headers
    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 观察 XHR 对象状态变化
    request.onreadystatechange = function handleXHRStateChange(e) {
      //   console.log(request.readyState)
      if (request.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType === 'text' ? request.responseText : request.response
      // 定义
      const response: IAxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        request,
        config
      }

      resolve(response)
    }
    // 发起网络请求
    request.send(data)
  })
}
