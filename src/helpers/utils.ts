
const toString = Object.prototype.toString


// 判断对象类型 - 对象类型（引用类型）
export function isObject (val:any):val is Object{
  return val !== null &&  typeof val === 'object'
}
// 判断 纯Object类型
export function isPlainObject (val:any): val is Object{
  return toString.call(val) === "[object Object]"
}
// 判断 Date 类型
export function isDate(val:any ):val is Date{
  return toString.call(val) === '[object Date]'
}
