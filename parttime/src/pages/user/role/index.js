import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { roleTableColumn } from './../../../columns'
import { Table } from 'antd'
import SearchComp from './../../../components/searchComp'

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
      roleTableColumn: roleTableColumn, // 表显示
      searchItem: ['id', 'roleName', 'detail', 'createTime'], // 搜索
    }
  }
  componentDidMount() {
    this.initData()
  }
  initData() {
    this.search()
  }
  search(data) {
    api.getUserRole({ page: 1, pageSize: 10, ...data }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data.list) && res.data.list.length > 0) {
          this.setState({ roleList: res.data.list })
        }
      }
    })
  }
  render() {
    let { roleList, roleTableColumn, searchItem } = this.state
    return (<div>
      <SearchComp searchItem={searchItem} columns={roleTableColumn} onSearch={this.search.bind(this)}/>
      <Table dataSource={roleList} columns={roleTableColumn} rowKey='id' size="middle" bordered/>
    </div>)
  }
}

export default UserRole
