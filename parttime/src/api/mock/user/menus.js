import sleep from 'system-sleep'
import Mock from 'mockjs'

const data = Mock.mock([
  { key: 'index', value: '首页1', icon: 'home', url: '/' },
  { key: 'user', value: '用户管理', icon: 'solution', url: '/user' },
  { key: 'demo', value: '系统用法示例', icon: 'solution', url: '/demo' }
])

export default (req, res, next) => {
  sleep(100)
  return {
    ret: 'success',
    code: 0,
    msg: '接口提示信息1',
    data: data
  }
}
