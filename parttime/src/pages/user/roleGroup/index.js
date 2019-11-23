import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { group } from './../../../columns'
import { Table } from 'antd'
import SearchComp from './../../../components/searchComp'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class UserRolegroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchItem: ['id', 'groupName', 'detail', 'createTime'],
      data: []
    }
  }
  componentDidMount() {
    this.initData()
  }
  initData() {
    this.search()
  }
  search(data = {}) {
    api.getUserRoleGroup({ page: 1, pageSize: 10, ...data }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data.list) && res.data.list.length > 0) {
          this.setState({ data: res.data.list })
        }
      }
    })
  }
  render() {
    let { searchItem, data } = this.state
    return (<div>
      <SearchComp searchItem={searchItem} columns={group.column} onSearch={this.search.bind(this)}/>
      <Table dataSource={data} columns={group.column} rowKey='id' size="middle" bordered/>
    </div>)
  }
}

export default UserRolegroup
