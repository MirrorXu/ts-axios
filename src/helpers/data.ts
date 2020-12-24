
import { isPlainObject } from './utils'

export function transformRequest(data:any):any{
  if(isPlainObject(data)){
    return JSON.stringify(data)
  }
}


export function transformResponse(data:any):any{
  if(typeof data === 'string'){
      try{
        data = JSON.parse(data)
      }catch(err){
        // data is not convert to object
      }
  }
  return data
}
