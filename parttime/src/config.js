export default {
  // 应用名称
  appName: '网站后台',
  // 子名称
  subName: '后台',
  // 首页路由
  homeRoute: '/',
  // 是否开启权限校验，默认false
  needAuth: true,
  // 登陆路由
  loginRoute: '/user/login',
  // api域名前缀，支持向多个系统的api请求，这里定义prefixName，在api/index.js中添加{prefixName: 'defaultDomain'}参数即可
  baseUrl: {
    default: '/api',
    otherDomain: {
      development: 'http://localhost:3333/api',
      test: '//test-api.xxx.com',
      pre: '//pre-api.xxx.com',
      production: 'http://120.27.214.189:3333/api'
    }
  },
  // 如无前线要求，可直接在此配置侧边栏菜单
  menus: []
}
