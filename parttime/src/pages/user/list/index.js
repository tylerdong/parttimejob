import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { user } from './../../../columns'
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
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          this.setState({ userList: res.data })
        }
      }
    })
  }

  render() {
    let { userList, searchItem } = this.state
    return (
      <div>
        <SearchComp searchItem={searchItem} columns={user.column} onSearch={this.search.bind(this)}/>
        <Table dataSource={userList} columns={user.column} rowKey='id' size="middle" bordered/>
      </div>
    )
  }
}

export default UserList
