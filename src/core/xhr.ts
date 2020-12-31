import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import {createError} from '../helpers/error'



export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType, timeout} = config

    // 生成xhr实例
    const request = new XMLHttpRequest()

    // 初始化请求
    request.open(method.toUpperCase(), url!, true)

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

    if (timeout) {
      request.timeout = timeout
    }
    // 观察 XHR 对象状态变化
    request.onreadystatechange = function handleXHRStateChange(e) {

      // readyState 状态值说明
      // 0(UNSENT):未初始化。尚未调用open()方法
      // 1(OPENED):启动。已经调用open()方法，但尚未调用send()方法
      // 2(HEADERS_RECEIVED):发送。己经调用send()方法，且接收到头信息
      // 3(LOADING):接收。已经接收到部分响应主体信息
      // 4(DONE):完成。已经接收到全部响应数据，而且已经可以在客户端使用了

      //   console.log(request.readyState)
      if (request.readyState !== 4) {
        return
      }

      // 网络或超时时 status为 0
      if (request.status === 0) {
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
      // 处理 resonse
      handleResponse(response)
    }
    // 网络错误
    request.onerror = function handleError() {
      reject(createError('网络错误' , config , null , request))
    }
    // 超时错误
    request.ontimeout = function handleRequestTimeOut() {
      reject(createError(`网络请求超时${timeout} ms` , config , 'ECONNABORTED',request))
    }
    // 终止时事件
    request.abort = function() {
      console.log('request abort:', config)
    }
    // 发起网络请求
    request.send(data)


    // 对服务的响应进行处理
    function handleResponse(response: IAxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`请求失败${response.statusText}` , config , null , response ,response))
      }
    }
  })
}
