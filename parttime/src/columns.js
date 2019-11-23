import React from 'react'
import { Divider, Icon } from 'antd'
import style from './../src/static/css/index.pcss'
const id = { title: 'ID', dataIndex: 'id', key: 'id', type: 'input' }
const name = { title: '姓名', dataIndex: 'name', key: 'name', type: 'input' }
const mobile = { title: '手机号', dataIndex: 'mobile', key: 'mobile', type: 'input' }
const email = { title: '邮箱', dataIndex: 'email', key: 'email', type: 'input' }
const thumb = { title: '头像', dataIndex: 'thumb', key: 'thumb', render: src => <img alt='' src={ src }/> }
const createTime = { title: '创建时间', dataIndex: 'createTime', key: 'createTime', type: 'time' }
const updateTime = { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', type: 'time' }
const action = { title: '操作', key: 'action', render: (text, record) => <span><Icon type="edit"/><Divider type="vertical"/><Icon type="delete" className={style.deleteLink}/></span> }

const roleName = { title: '角色', dataIndex: 'roleName', key: 'roleName', type: 'input' }
const groupName = { title: '用户组', dataIndex: 'groupName', key: 'groupName', type: 'input' }
const detail = { title: '介绍', dataIndex: 'describe', key: 'describe', type: 'input' }

const user = { column: [id, name, email, mobile, thumb, createTime, updateTime, action], field: [name, email, mobile, thumb] }
const role = { column: [id, roleName, detail, updateTime, createTime, action], field: [roleName, detail] }
const group = { column: [id, groupName, detail, updateTime, createTime, action], field: [groupName, detail] }

export {
  user,
  role,
  group
}
