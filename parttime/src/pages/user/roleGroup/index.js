import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'
import { group, pageSet } from './../../../columns'
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
class UserRolegroup extends Component {
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
    api.user.getUserRoleGroup({ current, pageSize, ...search }).then(res => {
      if (res.success) {
        if (res.data && Array.isArray(res.data.data)) {
          let { pageSet } = this.state
          pageSet.total = res.data.total
          this.setState({ data: res.data.data, pageSet })
        }
      }
    })
  }
  popUpRoleGroup(show) {
    this.setState({ showAdd: show })
  }
  addRoleGroup(data) {
    api.user.addRoleGroup(data).then(res => {
      if (res.success) {
        this.popUpRoleGroup(false)
        this.search()
      }
    })
  }
  handleDelete(record) {
    console.log(record)
  }
  handleEdit(record) {
    console.log(record)
  }
  render() {
    let { data, showAdd, pageSet } = this.state
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
        searchField={group.searchField}
        onAdd={this.popUpRoleGroup.bind(this, true)}
        onSearch={this.onSearch.bind(this)}/>
      <Table dataSource={data}
        columns={group.column({ handleDelete: this.handleDelete.bind(this), handleEdit: this.handleEdit.bind(this) })}
        rowKey='id'
        size="middle"
        pagination={paginationProps}
        bordered/>
      <AddComp field={group.field}
        showAdd={showAdd}
        onAddData={this.addRoleGroup.bind(this)}
        onClose={this.popUpRoleGroup.bind(this, false)}
        title={route.title}/>
    </div>)
  }
}

export default UserRolegroup
