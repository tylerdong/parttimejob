import storage from './storage'
import axios from 'axios'
import config from 'config'

const buildEnv = process.env.BUILD_ENV || 'development'
let fetcher = axios.create({
  method: 'post',
  withCredentials: true,
  headers: {
    'Accept': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response.use(function (response) {
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
  let prefixName = option.prefixName || 'default'
  // 不指定服务器地址
  if (url.indexOf('http') !== 0) {
    let baseUrl = config.baseUrl[prefixName]
    if (typeof baseUrl === 'object') {
      baseUrl = baseUrl[buildEnv]
    }
    console.log('API buildEnv&prefixName&baseUrl:', `${buildEnv}&${prefixName}&${baseUrl}`)
    url = baseUrl + url
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
