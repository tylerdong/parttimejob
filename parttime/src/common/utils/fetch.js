import storage from './storage'
import axios from 'axios'
import config from 'config'
import { message } from 'antd'

const buildEnv = process.env.BUILD_ENV || 'development'
let fetcher = axios.create({
  method: 'post',
  withCredentials: true,
  headers: {
    'Accept': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  transformRequest: [function (data) {
    const userInfo = storage.getUser()
    if (userInfo && data && !data.NOUSERINFO) {
      data.token = userInfo.token
    }
    return JSON.stringify(data)
  }]
})

fetcher.interceptors.request.use(function (config) {
  message.loading('请求中，请稍候')
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response.use(function (response) {
  message.destroy()
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default async (url = '', params = {}, option = {}) => {
  if (!url) {
    return Promise.reject(`params 'url' not exists!`)
  }
  // 默认get请求
  let method = option.method || 'get'
  let prefixName = option.prefixName || 'otherDomain'
  console.log(prefixName)
  // 不指定服务器地址
  console.log(url)
  if (url.indexOf('http') !== 0) {
    let baseUrl = config.baseUrl[prefixName]
    console.log(baseUrl)
    if (typeof baseUrl === 'object') {
      baseUrl = baseUrl[buildEnv]
    }
    url = baseUrl + url
    console.log(url)
  }
  switch (method) {
    case 'get':
      return fetcher.get(url, { params: params })
    case 'post':
    case 'put':
    case 'patch':
      return fetcher.post(url, params, option)
    default:
      return Promise.reject(`unKnown request method '${method}'`)
  }
}
