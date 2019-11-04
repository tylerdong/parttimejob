import React, { Component } from 'react'
import storeKit from 'storeKit'
import api from 'api'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: []
    }
  }
  componentDidMount() {
    api.getUserList({ page: 1, pageSize: 10 }).then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div>
        <p>本系统叫 {this.props.appName}，我是从store中获取的哦</p>
        Hello, 当前页面名称叫 user!
      </div>
    )
  }
}

export default User
