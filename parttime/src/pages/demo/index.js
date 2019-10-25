import React, { Component } from 'react'
import storeKit from 'storeKit'
import { Link } from 'react-router-dom'
import style from './index.pcss'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <ul className={style.demos}>
          <li>
            <Link to={'/demo/redux'}>1.Redux使用方法</Link>
          </li>
          <li>
            <Link to={'/demo/auth'}>2.Auth使用方法</Link>
          </li>
          <li>
            <Link to={'/demo/menutip'}>3.侧边菜单栏使用方法</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Demo
