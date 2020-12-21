import {IAxiosRequestConfig} from './types/index'

export default function xhr(config:IAxiosRequestConfig):void{
  const { data = null , url , method='get'} = config
  const request  = new  XMLHttpRequest()
  request.open(method.toUpperCase() , url , true)
  request.send(data)
}
