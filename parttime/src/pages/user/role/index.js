import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { role, pageSet } from './../../../columns'
import { Table } from 'antd'
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
      showAdd: false,
      pageSet: { ...pageSet },
      search: {}
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
    api.user.getUserRole({ current, pageSize, ...search }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data.data)) {
          let { pageSet } = this.state
          pageSet.total = res.data.total
          this.setState({ roleList: res.data.data, pageSet })
        }
      }
    })
  }
  // 添加弹出框
  popAddRole(isShow) {
    this.setState({ showAdd: isShow })
  }
  // 添加角色
  addRole(data) {
    api.user.addRole(data).then(res => {
      if (res.success) {
        this.popAddRole(false)
      }
    })
  }
  handleDelete(record) {
    api.user.deleteRole({ id: record.id }).then(res => {
      if (res.success) {
        this.search()
      }
    })
  }
  handleEdit(record) {
    console.log(record)
  }
  render() {
    let { roleList, showAdd, pageSet } = this.state
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
    return (<div>
      <SearchComp
        searchField={role.searchField}
        onSearch={this.onSearch.bind(this)}
        onAdd={this.popAddRole.bind(this, true)}/>
      <Table dataSource={roleList}
        columns={role.column({ handleDelete: this.handleDelete.bind(this), handleEdit: this.handleEdit.bind(this) })}
        rowKey='id'
        size="middle"
        pagination={paginationProps}
        bordered/>
      <AddComp
        field={role.field}
        showAdd={showAdd}
        onAddData={this.addRole.bind(this)}
        onClose={this.popAddRole.bind(this, false)}
        title={route.title}/>
    </div>)
  }
}

export default UserRole
