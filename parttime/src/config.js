export default {
    // 应用名称
    appName: 'Mobile交易版系统',
    // 子名称
    subName: 'H5交易版',
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
            development: '/other',
            test: '//test-api.xxx.com',
            pre: '//pre-api.xxx.com',
            production: '//api.xxx.com'
        }
    },
    // 如无前线要求，可直接在此配置侧边栏菜单
    menus: []
}