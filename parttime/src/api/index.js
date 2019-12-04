import fetch from 'utils/fetch'

export default {
  user: {
    login(param) {
      return fetch('/login', param)
    },
    logout(param) {
      return fetch('/logout', param)
    },
    getMenus(param) {
      return fetch('/user/menus', param)
    },
    // 获取所有用户信息
    getUserList: param => fetch('/user/list', param),
    // 获取用户信息
    getUserInfo: param => fetch('/user/info', param),
    // 添加用户
    addUser: param => fetch('/user/add', param, { method: 'post' }),
    // 删除用户
    deleteUser: param => fetch('/user/delete', param, { method: 'post' }),
    // 获取APP初始化信息，包含权限等内容
    getInitState: param => fetch('/base/initState', param, { method: 'get' }),
    // 用户角色
    getUserRole(param) {
      return fetch('/user/role/list', param)
    },
    addRole(param) {
      return fetch('/user/role/add', param, { method: 'post' })
    },
    deleteRole: param => fetch('/user/role/delete', param, { method: 'post' }),
    // 角色组
    getUserRoleGroup(param) {
      return fetch('/user/role/group', param)
    },
    // 添加角色组
    addRoleGroup(param) {
      return fetch('/user/role/group/add', param, { method: 'post' })
    },
    // 用户权限
    getUserAuth(param) {
      return fetch('/user/auth/list', param)
    }
  }
}
