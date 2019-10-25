import React, { Commonent } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from '../../core/store'

class Error500 extends Commonent {
  // 如果有需要通过redux来维护的数据，在此处映射即可
  static getStore = store => {
    return { appName: store.global.appName }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (<div>
      <p>本系统叫{this.props.appName}, 我是从store中获取的</p>
      Hello,当前页面名称叫error500！
    </div>)
  }
}

export default connect(Error500.getStore, mapDispatchToProps)(Error500)
