import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

// 处理config参数
function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理URL
function transformURL(config: IAxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}
// 处理 headers
function transformHeaders(config: IAxiosRequestConfig): void {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
// 处理 config.data
function transformRequestData(config: IAxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理 响应 data

function transformResponseData(res: IAxiosResponse): IAxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default function dispatchRequest(config: IAxiosRequestConfig): IAxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
