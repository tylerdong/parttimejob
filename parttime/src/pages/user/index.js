import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { user } from './../../columns'
import { Table } from 'antd'
import SearchComp from './../../components/searchComp'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: []
    }
  }
  componentDidMount() {
    api.user.getUserList({ page: 1, pageSize: 10 }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data.list) && res.data.list.length > 0) {
          this.setState({ userList: res.data.list })
        }
      }
    })
  }
  render() {
    let { userList } = this.state
    return (
      <div>
        <SearchComp/>
        <Table dataSource={userList} columns={user.column} rowKey='id' size="middle" bordered/>
      </div>
    )
  }
}

export default User
