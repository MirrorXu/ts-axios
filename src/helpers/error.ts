import { IAxiosRequestConfig, IAxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  resonse?: IAxiosResponse

  constructor(
    message: string,
    config: IAxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: IAxiosResponse
  ) {
    super(message)
    this.isAxiosError = true
    this.config = config
    this.code = code
    this.request = request
    this.resonse = response
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: IAxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: IAxiosResponse
) {
  const error = new AxiosError(message, config , code , request , response)
  return  error
}
