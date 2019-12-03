import React, { Component } from 'react'
import { Tabs, Input, Button, DatePicker } from 'antd'
const { TabPane } = Tabs
const { Search } = Input
const { RangePicker } = DatePicker
import style from './../static/css/index.pcss'
import { Type } from 'utils'

class SearchComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moreSearch: true, // 显示更多搜索
      timeSpan: [{ name: 'today', title: '今天' },
        { name: 'yesterday', title: '昨天' },
        { name: 'currentMonth', title: '本月' },
        { name: 'lastMonth', title: '上月' }],
      searchObj: {}
    }
  }

  componentDidMount() {
  }

  // 搜索条件
  setSearchState(event, column) {
    let { searchObj } = this.state
    if (event.type === 'time') {
      if (column[0]) {
        searchObj[`${event.dataIndex}Start`] = column[0].format('YYYY-MM-DD hh:mm')
      } else {
        delete searchObj[`${event.dataIndex}Start`]
      }
      if (column[1]) {
        searchObj[`${event.dataIndex}End`] = column[1].format('YYYY-MM-DD hh:mm')
      } else {
        delete searchObj[`${event.dataIndex}End`]
      }
    } else {
      if (event.target.value) {
        searchObj[event.target.name] = event.target.value
      } else {
        delete searchObj[event.target.name]
      }
    }
    this.setState(searchObj)
  }

  // 简单搜索，默认搜索第一个字段
  searchKeyword(value) {
    let searchObj = {}
    let { searchField } = this.props
    if (searchField.length > 0) {
      searchObj[searchField[0].key] = value
      this.onSearch(searchObj)
    }
  }

  // 回车搜索
  searchEnterKeyword(e) {
    if (e.target.value) {
      let searchObj = {}
      let { searchField } = this.props
      if (searchField.length > 0) {
        searchObj[searchField[0].key] = e.target.value
        this.onSearch(searchObj)
      }
    }
  }
  // 条件搜索
  searchClick() {
    let { searchObj } = this.state
    this.onSearch(searchObj)
  }

  // 触发父组件搜索
  onSearch(searchObj) {
    this.props.onSearch(searchObj)
  }

  // 添加，触发父组件，弹出添加框
  popUpAdd() {
    this.props.onAdd()
  }

  getSearchItem = () => {
    let { searchField } = this.props
    return (<div className={style.searchItem}>
      {searchField.map((s, index) => {
        if (s.type === 'input') { // 文本框
          return <div key={s.key}>
            <label htmlFor={s.key}>{s.title}</label>
            <Input name={s.key} id={s.key} allowClear placeholder={s.title} onChange={this.setSearchState.bind(this)} className={style.itemInput}/>
          </div>
        } else if (s.type === 'time') { // 时间搜索
          return <div key={s.key}>
            <label htmlFor={s.key}>{s.title}</label>
            <RangePicker name={s.key} id={s.key} allowClear onChange={ this.setSearchState.bind(this, s) } className={style.itemInput}/>
          </div>
        } else {
          return null
        }
      })}
      <div key='submit-button'>
        <Button>重置</Button>
        <Button type="primary" className={style.commonMarginLeft} onClick={this.searchClick.bind(this)}>搜索</Button>
      </div>
    </div>)
  }

  render() {
    let { timeSpan, moreSearch } = this.state
    let { onAdd } = this.props
    return (<div>
      <div className={style.search}>
        <Tabs>{ timeSpan.map((t, i) => <TabPane tab={t.title} key={i}/>) }</Tabs>
        <div className={style.searchBox}>
          <Search
            allowClear
            className={style.itemInput}
            placeholder="请输入关键字"
            onPressEnter={this.searchEnterKeyword.bind(this)}
            onSearch={this.searchKeyword.bind(this)}/>
          <Button
            onClick={() => this.setState({ moreSearch: !moreSearch })}
            icon="search"
            className={style.commonMarginLeft}/>
          {Type.isFunction(onAdd) ? <Button
            onClick={this.popUpAdd.bind(this)}
            className={style.commonMarginLeft}
            type="primary"
            icon="plus"/> : null}
        </div>
      </div>
      {moreSearch ? this.getSearchItem() : null}
    </div>)
  }
}

export default SearchComp
