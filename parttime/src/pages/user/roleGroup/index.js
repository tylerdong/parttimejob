import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { group } from './../../../columns'
import { message, Table } from 'antd'
import SearchComp from './../../../components/searchComp'
import AddComp from './../../../components/addDataComp'
import route from './route'

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
      showAdd: false,
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
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          this.setState({ data: res.data })
        }
      }
    })
  }
  popUpRoleGroup(show) {
    this.setState({ showAdd: show })
  }
  addRoleGroup(data) {
    message.loading('加载中')
    api.addRoleGroup(data).then(res => {
      if (res.success) {
        this.popUpRoleGroup(false)
        this.search()
      }
    }).finally(() => message.destroy())
  }
  handleDelete(record) {
    console.log(record)
  }
  handleEdit(record) {
    console.log(record)
  }
  render() {
    let { data, showAdd } = this.state
    return (<div>
      <SearchComp
        searchField={group.searchField}
        onAdd={this.popUpRoleGroup.bind(this, true)}
        onSearch={this.search.bind(this)}/>
      <Table dataSource={data}
        columns={group.column({ handleDelete: this.handleDelete.bind(this), handleEdit: this.handleEdit.bind(this) })}
        rowKey='id'
        size="middle"
        bordered/>
      <AddComp field={group.field}
        showAdd={showAdd}
        onAddData={this.addRoleGroup.bind(this)}
        title={route.title}/>
    </div>)
  }
}

export default UserRolegroup
