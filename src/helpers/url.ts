import {isObject , isDate} from './utils'


const rulesMap = new Map([
  [/%40/g , '@'],
  [/%3A/ig , ':'],
  [/%24/g , '$'],
  [/%2C/ig , ','],
  [/%20/g , '+'],
  [/%5B/ig , '['],
  [/%5D/ig , ']'],
])

export function encode(val:string , replace = true , raw = true):string{
  if(raw){
    return val
  }
  let URIstr = encodeURIComponent(val)
  if(replace){
    rulesMap.forEach( (chater , reg )=>{
      URIstr.replace( reg,chater )
    })

  }
  return URIstr
}

export function buildURL(url: string, params?: any): string {
  if(!params ) return url

  const parts:string[] = []

  Object.keys(params).forEach(key=>{

    const val = params[key]

    if(val ===null || typeof val === 'undefined'){
      return
    }

    let values = []

    if(Array.isArray(val)){
      values = val
      key += '[]'
    }else{
      values = [val]
    }

    values.forEach(val=>{
      if(isDate(val)){
        val = val.toISOString()
      }else if( isObject(val)){
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })


  })

  let serializedParams = parts.join('&')

  if(serializedParams){
    const markIndex = url.indexOf('#')
    if(markIndex !== -1){
      url = url.slice(0 , markIndex)
    }

    url += (url.includes('?') ? '&' : '?') + serializedParams
  }

  return url
}
