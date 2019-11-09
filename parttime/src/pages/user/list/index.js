import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { userTableColumn } from './../../../columns'
import { Table } from 'antd'
import SearchComp from './../../../components/searchComp'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: [],
      userTableColumn: userTableColumn,
      searchItem: ['id', 'name', 'email', 'createTime', 'updateTime'],
      searchItemArr: []
    }
  }
  componentDidMount() {
    this.initData()
  }

  initData() {
    this.search()
  }

  search(data = {}) {
    api.getUserList({ page: 1, pageSize: 10, ...data }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data.list) && res.data.list.length > 0) {
          this.setState({ userList: res.data.list })
        }
      }
    })
  }

  render() {
    let { userList, userTableColumn, searchItem } = this.state
    return (
      <div>
        <SearchComp searchItem={searchItem} columns={userTableColumn} onSearch={this.search.bind(this)}/>
        <Table dataSource={userList} columns={userTableColumn} rowKey='id' size="middle" bordered/>
      </div>
    )
  }
}

export default UserList
