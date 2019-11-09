/**
 * 本文件由系统自动生成，请勿更改
 * 变量名代表route的name，变量名请按照驼峰格式书写，每个驼峰单词将被切分成route的path  userLogin => /user/login
 **/
import Loadable from 'react-loadable'
import Loading from 'components/Loading'
export const home = Loadable({ loader: () => import('pages/home/index.js'), loading: Loading })
export const user = Loadable({ loader: () => import('pages/user/index.js'), loading: Loading })
export const demo = Loadable({ loader: () => import('pages/demo/index.js'), loading: Loading })
export const userAuth = Loadable({ loader: () => import('pages/user/auth/index.js'), loading: Loading })
export const userList = Loadable({ loader: () => import('pages/user/list/index.js'), loading: Loading })
export const userLogin = Loadable({ loader: () => import('pages/user/login/index.js'), loading: Loading })
export const userRole = Loadable({ loader: () => import('pages/user/role/index.js'), loading: Loading })
export const demoAuth = Loadable({ loader: () => import('pages/demo/auth/index.js'), loading: Loading })
export const demoMenutip = Loadable({ loader: () => import('pages/demo/menutip/index.js'), loading: Loading })
export const demoRedux = Loadable({ loader: () => import('pages/demo/redux/index.js'), loading: Loading })
