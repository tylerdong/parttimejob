import React, { Component } from 'react'
import storeKit from 'storeKit'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class DemoMenutip extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <p>侧边菜单栏的配置有两种方式：</p>
        <p>1.如果无需按照权限来动态生成，则仅需在config.js中配置menus参数即可</p>
        <p>2.如果需要按照权限来动态生成，则需要提供一个getMenus接口来返回menus</p>
        <pre style={{ background: '#ddd' }}>
          {
            `
            {
              code: 0,
              msg: '菜单获取成功',
              data: [
                {
                  key: 'index',
                  value: '首页',
                  icon: 'home',
                  url: '/'                
                },
                {
                  key: 'user',
                  values: '用户管理',
                  icon: 'solution',
                  url: '/user'
                }
              ]
            }
            `
          }
        </pre>
      </div>
    )
  }
}

export default DemoMenutip
