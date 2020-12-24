import { isPlainObject } from './utils'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// headers 对象 处理
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
// 'content-type': 'application/json;charset=utf-8'

// 将字符串类型的 header 转为 对象类型 并返回
export function parseHeaders(headers: string): object {
  let parsedHeaders = Object.create(null)
  if (!headers) {
    return parsedHeaders
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key && (key = key.trim().toLowerCase())
    value && (value = value.trim())
    key &&  (parsedHeaders[key] = value)
  })
  return parsedHeaders
}
