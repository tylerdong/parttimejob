import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { user, pageSet } from './../../../columns'
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
      showAdd: false,
      pageSet: { ...pageSet }
    }
  }
  componentDidMount() {
    this.initData()
  }
  initData() {
    this.onSearch()
  }
  onSearch(data) {
    if (data) {
      this.setState({ search: data }, () => this.search())
    } else {
      this.search()
    }
  }
  search() {
    let { pageSet: { current, pageSize }, search } = this.state
    api.user.getUserList({ current, pageSize, ...search }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data.data)) {
          let { pageSet } = this.state
          pageSet.total = res.data.total
          this.setState({ userList: res.data.data, pageSet })
        }
      }
    })
  }
  popAddUser(show) {
    this.setState({ showAdd: show })
  }
  addUser(data) {
    api.user.addUser(data).then(res => {
      if (res.success) {
        this.popAddUser(false)
        this.search()
      }
    })
  }
  handleDelete(record) {
    api.user.deleteUser({ id: record.id }).then(res => {
      if (res.success) {
        this.search()
      }
    })
  }
  handleEdit(record) {
    console.log(record)
  }
  render() {
    let { userList, showAdd, pageSet } = this.state
    let paginationProps = {
      ...pageSet,
      onChange: (current, pageSize) => {
        let { pageSet } = this.state
        pageSet.current = current
        this.setState({ pageSet }, () => this.onSearch())
      },
      onShowSizeChange: (current, size) => {
        let { pageSet } = this.state
        pageSet.pageSize = size
        this.setState({ pageSet }, () => this.onSearch())
      }
    }
    return (
      <div>
        <SearchComp
          searchField={user.searchField}
          onSearch={this.onSearch.bind(this)}
          onAdd={this.popAddUser.bind(this, true)}/>
        <Table
          dataSource={userList}
          pagination={paginationProps}
          columns={user.column({ handleDelete: this.handleDelete.bind(this), handleEdit: this.handleEdit.bind(this) })}
          rowKey='id'
          size="middle"
          bordered/>
        <AddComp
          field={user.field}
          showAdd={showAdd}
          onAddData={this.addUser.bind(this)}
          onClose={this.popAddUser.bind(this, false)}
          title={route.title}/>
      </div>
    )
  }
}
export default UserList
