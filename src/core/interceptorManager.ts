import { IAxiosInterceptorManager, ResolvedFn, RejectedFn } from '../types'

// 定义拦截对象type
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 拦截器管理类
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T>  | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    // 返回interceptor在数组中的下标为其id
    const interceptorId = this.interceptors.length - 1
    return interceptorId
  }
  eject(interceptorId: number) {
    if (this.interceptors[interceptorId]) {
      this.interceptors[interceptorId] = null
    }
  }
  // 遍历拦截器
  forEach(fn: (interceptor: Interceptor<T>) => void){
    this.interceptors.forEach(item=>{
      if(item !== null){
        fn(item)
      }
    })
  }
}
