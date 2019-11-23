import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { role } from './../../../columns'
import { Table, message } from 'antd'
import SearchComp from './../../../components/searchComp'
import AddComp from './../../../components/addDataComp'
import route from './route'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class UserRole extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: ['id', 'roleName', 'detail', 'createTime'], // 搜索
      showAdd: false
    }
  }
  componentDidMount() {
    this.initData()
  }
  initData() {
    this.search()
  }
  search(data) {
    api.getUserRole({ page: 1, pageSize: 3, ...data }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          this.setState({ roleList: res.data })
        }
      }
    })
  }
  popAddRole(isShow) {
    this.setState({ showAdd: isShow })
  }
  // 添加角色
  addRole(data) {
    message.loading('加载中')
    api.addRole(data).then(res => {
      if (res.success) {
        this.popAddRole(false)
      }
    }).finally(() => {
      message.destroy()
    })
  }
  render() {
    let { roleList, searchItem, showAdd } = this.state
    return (<div>
      <SearchComp searchItem={searchItem} columns={role.column} onSearch={this.search.bind(this)} onAdd={this.popAddRole.bind(this)}/>
      <Table dataSource={roleList} columns={role.column} rowKey='id' size="middle" bordered/>
      <AddComp field={role.field} showAdd={showAdd} onAddData={this.addRole.bind(this)} title={route.title}/>
    </div>)
  }
}

export default UserRole
