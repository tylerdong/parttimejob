import React from 'react'
import { Divider, Icon, Popconfirm } from 'antd'
import style from './../src/static/css/index.pcss'
import config from 'config'
const pageSet = { current: 1, pageSize: 10, total: 0, showQuickJumper: true, showSizeChanger: true, pageSizeOptions: ['10', '20'] }
const id = { title: 'ID', dataIndex: 'id', key: 'id', type: 'input' }
const name = { title: '姓名', dataIndex: 'name', key: 'name', type: 'input', required: true, validExp: /^[0-9a-zA-Z\u4E00-\uFA29]{2,50}$/, validMsg: '2到50位数字，字母或字符' }
const mobile = { title: '手机号', dataIndex: 'mobile', key: 'mobile', type: 'input', required: true, validExp: /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i, validMsg: '手机格式不正确' }
const email = { title: '邮箱', dataIndex: 'email', key: 'email', type: 'input', required: true, validExp: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/, validMsg: '邮箱格式不正确' }
const thumb = { title: '头像', dataIndex: 'thumb', key: 'thumb', render: src => <img className={style.tableImg} alt='' src={ `${config.baseUrl.resource.upload}${src}` }/>, type: 'file', accept: 'image/gif,image/jpeg', size: 2 }
const createTime = { title: '创建时间', dataIndex: 'createTime', key: 'createTime', type: 'time' }
const updateTime = { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', type: 'time' }
const action = props => {
  let { handleDelete, handleEdit } = props
  return {
    title: '操作',
    key: 'action',
    render: (text, record) => <span>
      <Popconfirm title='确定删除？' onConfirm={() => handleDelete(record)} okText="确定" cancelText="取消">
        <Icon type="delete" className={style.deleteLink}/>
      </Popconfirm>
      <Divider type="vertical"/>
      <Icon type="edit" onClick={() => handleEdit(record)}/>
    </span>
  }
}

const roleName = { title: '角色', dataIndex: 'roleName', key: 'roleName', type: 'input' }
const groupName = { title: '用户组', dataIndex: 'groupName', key: 'groupName', type: 'input' }
const detail = { title: '介绍', dataIndex: 'describe', key: 'describe', type: 'input' }

const user = { column: props => [id, name, email, mobile, thumb, createTime, updateTime, action(props)], field: [name, email, mobile, thumb], searchField: [name, email, mobile, createTime] }
const role = { column: props => [id, roleName, detail, updateTime, createTime, action(props)], field: [roleName, detail], searchField: [roleName, detail] }
const group = { column: props => [id, groupName, detail, updateTime, createTime, action(props)], field: [groupName, detail], searchField: [groupName, detail] }

export {
  pageSet,
  user,
  role,
  group
}
