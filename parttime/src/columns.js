import React from 'react'
import { Divider, Icon } from 'antd'
import style from './../src/static/css/index.pcss'
const id = { title: 'ID', dataIndex: 'id', key: 'id' }
const name = { title: '姓名', dataIndex: 'name', key: 'name' }
const email = { title: '邮箱', dataIndex: 'email', key: 'email' }
const thumb = { title: '头像', dataIndex: 'thumb', key: 'thumb', render: src => <img alt='' src={ src }/> }
const createTime = { title: '创建时间', dataIndex: 'createTime', key: 'createTime' }
const updateTime = { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' }
const action = { title: '操作', key: 'action', render: (text, record) => <span><Icon type="edit"/><Divider type="vertical"/><Icon type="delete" className={style.deleteLink}/></span> }

const userTableColumn = [id, name, email, thumb, createTime, updateTime, action]

export {
  userTableColumn
}
