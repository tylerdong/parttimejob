import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { user } from './../../../columns'
import { Table } from 'antd'
import SearchComp from './../../../components/searchComp'
import AddComp from '../../../components/addDataComp'
import route from './route'

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
      showAdd: false
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
        if (res.data && Array.isArray(res.data)) {
          this.setState({ userList: res.data })
        }
      }
    })
  }
  popAddUser(show) {
    this.setState({ showAdd: show })
  }
  addUser() {
    // TODO
  }
  handleDelete(record) {
    console.log(record)
  }
  handleEdit(record) {
    console.log(record)
  }
  render() {
    let { userList, showAdd } = this.state
    return (
      <div>
        <SearchComp
          searchField={user.searchField}
          onSearch={this.search.bind(this)}
          onAdd={this.popAddUser.bind(this, true)}/>
        <Table
          dataSource={userList}
          columns={user.column({ handleDelete: this.handleDelete.bind(this), handleEdit: this.handleEdit.bind(this) })}
          rowKey='id'
          size="middle"
          bordered/>
        <AddComp
          field={user.field}
          showAdd={showAdd}
          onAddData={this.addUser.bind(this)}
          title={route.title}/>
      </div>
    )
  }
}
export default UserList
