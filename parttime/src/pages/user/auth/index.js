import React, { Component } from 'react'
import storeKit from 'storeKit'
import storage from 'utils/storage'
import api from 'api'
import { Tree } from 'antd'
const { TreeNode } = Tree

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class UserAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
      defaultExpandAll: true
    }
  }
  componentDidMount() {
    this.initData()
  }
  initData() {
    let menuData = storage.getMenu()
    if (menuData) {
      this.setState({ treeData: menuData })
    } else {
      api.user.getMenus().then(res => {
        if (res.success && res.data) {
          storage.setMenu(res.data) // 缓存起来
          this.setState({ treeData: res.data })
        }
      })
    }
  }
  renderTnode = data => data.map(menu => {
    if (menu.children) {
      return (<TreeNode title={menu.title} key={menu.key} dataRef={menu}>{ this.renderTnode(menu.children) }</TreeNode>)
    }
    return <TreeNode title={menu.title} key={menu.key}/>
  })
  render() {
    let { treeData, defaultExpandAll } = this.state
    return (<div>
      <Tree checkable defaultExpandAll={defaultExpandAll}>
        { this.renderTnode(treeData) }
      </Tree>
    </div>)
  }
}

export default UserAuth
