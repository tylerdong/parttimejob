import sleep from 'system-sleep'
import Mock from 'mockjs'

const data = Mock.mock([
  { key: 'index', value: '首页', icon: 'home', url: '/' },
  {
    key: 'user',
    value: '用户管理',
    icon: 'user',
    url: '/user',
    children: [
      { key: 'user-auth', value: '权限', icon: 'build', url: '/user/auth' },
      { key: 'user-role', value: '角色', icon: 'api', url: '/user/role' },
      { key: 'user-roleGroup', value: '角色组', icon: 'api', url: '/user/roleGroup' },
      { key: 'user-list', value: '用户', icon: 'user', url: '/user/list' }
    ]
  },
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
