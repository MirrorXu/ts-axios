import axios, { IAxiosError } from '../../src/index'

// axios({
//   method: 'get',
//   url: '/error/get1'
// }).then((res) => {
//   console.log('success' , res)
// }).catch((e) => {
//   console.log('error', e)
// })

// axios({
//   method: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log('success' , res)
// }).catch((e) => {
//   console.log('error',e)
// })

// 测试网络中断的情况  当定时器执行后立刻到 浏览器 devTools->Network中 关闭网络
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   }).then((res) => {
//     console.log(res)
//   }).catch((e) => {
//     console.log(e)
//   })
// }, 8000)

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// }).then((res) => {
//   console.log('success',res)
// }).catch((e) => {
//   console.log('error' ,e)
// })


// 测试 IAxiosError 类型
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: IAxiosError) => {
    console.log('失败');

    console.log(e.message)
    console.log(e.config)
    console.log(e.code)
    console.log(e.request)
    console.log(e.isAxiosError)
  })
