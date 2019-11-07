import React, { Component } from 'react'
import { Tabs, Input } from 'antd'
const { TabPane } = Tabs
const { Search } = Input
import style from './../static/css/index.pcss'

class SearchComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeSpan: [{ name: 'today', title: '今天' },
        { name: 'yesterday', title: '昨天' },
        { name: 'currentMonth', title: '本月' },
        { name: 'lastMonth', title: '上月' }]
    }
  }

  componentDidMount() {
  }

  render() {
    let { timeSpan } = this.state
    return (<div className={style.search}>
      <Tabs>
        { timeSpan.map((t, i) => <TabPane tab={t.title} key={i}/>) }
      </Tabs>
      <div className={style.searchBox}>
        <Search placeholder="请输入关键字" onSearch={value => console.log(value)} style={{ width: 200 }}/>
      </div>
    </div>)
  }
}

export default SearchComp
