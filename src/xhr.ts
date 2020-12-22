import {IAxiosRequestConfig} from './types/index'

export default function xhr(config:IAxiosRequestConfig):void{
  const { data = null , url , method='get' , headers={}} = config
  const request  = new  XMLHttpRequest()
  request.open(method.toUpperCase() , url , true)
  Object.keys(headers).forEach((name )=>{
    if(!data && name === 'Content-Type' ){
      delete headers[name]
    }else{
      request.setRequestHeader(name , headers[name])
    }
  })
  request.send(data)
}
