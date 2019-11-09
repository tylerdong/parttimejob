import React, { Component } from 'react'
import { Tabs, Input, Button } from 'antd'
const { TabPane } = Tabs
const { Search } = Input
import style from './../static/css/index.pcss'

class SearchComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moreSearch: true,
      timeSpan: [{ name: 'today', title: '今天' },
        { name: 'yesterday', title: '昨天' },
        { name: 'currentMonth', title: '本月' },
        { name: 'lastMonth', title: '上月' }],
      searchObj: {}
    }
  }

  componentDidMount() {
  }

  setSearchState(event) {
    let { searchObj } = this.state
    if (event.target.value) {
      searchObj[event.target.name] = event.target.value
    } else {
      delete searchObj[event.target.name]
    }
    this.setState(searchObj)
  }

  searchClick() {
    let { searchObj } = this.state
    this.props.onSearch(searchObj)
  }

  getSearchItem = () => {
    let { searchItem, columns } = this.props
    if (searchItem.length > 0) {
      return (<div className={style.searchItem}>
        {searchItem.map(index => {
          const s = columns.find(c => c.dataIndex === index)
          if (s) {
            if (s.type === 'input') {
              return <div key={s.key}>
                <label htmlFor={s.key}>{s.title}</label>
                <Input name={s.key} id={s.key} allowClear placeholder={s.title} onChange={this.setSearchState.bind(this)} className={style.itemInput}/>
              </div>
            } else if (s.type === 'timeRange') {
              return <div key={s.key}>
                <label htmlFor={s.key}>{s.title}</label>
                <Input name={s.key} id={s.key} allowClear placeholder={s.title} onChange={ this.setSearchState.bind(this) } className={style.itemInput}/>
              </div>
            } else {
              return null
            }
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
  }

  render() {
    let { timeSpan, moreSearch } = this.state
    return (<div>
      <div className={style.search}>
        <Tabs>
          { timeSpan.map((t, i) => <TabPane tab={t.title} key={i}/>) }
        </Tabs>
        <div className={style.searchBox}>
          <Search placeholder="请输入关键字" allowClear onSearch={value => console.log(value)} className={style.itemInput}/>
          <Button onClick={() => this.setState({ moreSearch: !moreSearch })} icon="search" className={style.commonMarginLeft}/>
        </div>
      </div>
      {(moreSearch) ? this.getSearchItem() : null}
    </div>)
  }
}

export default SearchComp
