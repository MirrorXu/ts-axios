import { IAxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

// 处理config参数
function processConfig (config:IAxiosRequestConfig):void{
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理URL
function transformURL(config:IAxiosRequestConfig):string{
  const { url , params } = config
  return buildURL(url,params)
}
// 处理 headers
function transformHeaders(config:IAxiosRequestConfig):void{
  const {headers = {},data} = config
  return processHeaders(headers ,data)
}
// 处理 config.data
function transformRequestData(config:IAxiosRequestConfig):any{
  return transformRequest(config.data)
}





function axios(config:IAxiosRequestConfig):void{
  // debugger
  // todo
  processConfig(config)
  xhr(config)
}

export default axios
