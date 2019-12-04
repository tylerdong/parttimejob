## parttimejob-全栈实践


本项目使用react+node.js做的一个全栈实践项目，前端参考了[React-Admin-Starter](https://github.com/veryStarters/react-admin-starter)这个项目，这个项目的自动配置路由，自动页面骨架的思路很新颖。后端是node.js+express提供接口访问，最主要的内容是mysql.js的使用和使用nginx反向代理来跨域。

## 前端parttime

前端基于框架[React-Admin-Starter](https://github.com/veryStarters/react-admin-starter)基本没有改动。这是一个后台管理系统，最常用的功能也就是增删改查，这里做了一些自己的调整。

### 统一的字段名
开发PC端这种后台项目，产品经理经常会提一些比较临时需求。比如原型上一个表格字段“编辑时间”，做到一般快结尾了或者已经快上线了，说要改成“更新时间”。这个时候就比较蛋疼了，当然最直接的办法就是Ctrl+H全局查找，一个一个替换，但是遇到新手连编辑器都不是很熟的小伙伴就要捉急了（我见过一些刚入门的小伙子，用的是vscode，还真不知道全局查找，快速跳转这些快捷键）。
前端项目中使用的是ant.design for react，table有两个地方需要注意，数据源和显示列名：
```javascript
// 数据源
const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号' },
  { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号' }
];

// 显示列
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '住址', dataIndex: 'address', key: 'address' }
]
```
这里可以把所有字段单独写在一个文件里面，从同一个地方引用这个字段，这样只修改这一个字段所有的名字都改过来了。如下：
columns.js 定义字段：
```javascript
const id = { title: 'ID', dataIndex: 'id', key: 'id', type: 'input' }
const name = { title: '姓名', dataIndex: 'name', key: 'name', type: 'input' }
const mobile = { title: '手机号', dataIndex: 'mobile', key: 'mobile', type: 'input' }
const email = { title: '邮箱', dataIndex: 'email', key: 'email', type: 'input' }
const thumb = { title: '头像', dataIndex: 'thumb', key: 'thumb', render: src => <img alt='' src={ src }/> }
const user = [id, name, email, mobile, thumb, createTime, updateTime]
export {
  user
}
```
user/list/index.js使用字段：
```javascript
import { user } from './../../../columns'

<Table
	dataSource={userList}
	pagination={paginationProps}
	columns={user})}
	rowKey='id'
	size="middle"
	bordered/>
```

问题来了，如果有编辑，删除字段怎么办呢？这个时候就需要和引用它的地方交互了。这里可以使用给子组件传递函数的方法来实现：
```javascript
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
const user = { column: props => [id, name, email, mobile, thumb, createTime, updateTime, action(props)] }
```
在使用这个字段的时候就可以调用一个函数：
```javascript
handleDelete(record) {
	api.user.deleteUser({ id: record.id }).then(res => {
		if (res.success) {
			this.search()
		}
	})
}
	
<Table
	dataSource={userList}
	pagination={paginationProps}
	columns={user.column({ handleDelete: this.handleDelete.bind(this), handleEdit: this.handleEdit.bind(this) })}
	rowKey='id'
	size="middle"
	bordered/>
```
这里给Table的columns属性赋的是一个函数，函数参数是一个也是一个函数，这样子组件就可以调用到这个函数，有点拗口，你懂就好。columns.js中的action字段只是一个桥梁作用，根据具体逻辑传递进去的函数执行不同的操作，不同场合执行的操作不同，但是操作是类似的，基本都是删除，和编辑两个逻辑。

分页也有类似的问题，比如那天产品经理说：“分页样式统一起来，每个地方可选的每页个数都是20, 30, 50, 100”。我们也可以把这个定义在同一个地方，方便修改。这里仍然定义在columns.js中
```javascript
const pageSet = { current: 1, pageSize: 2, total: 0, showQuickJumper: true, showSizeChanger: true, pageSizeOptions: ['20', '30', '50', '100'] }
```
使用的，如果我们要需要某些场合需要覆盖掉部分信息，可以在state中使用...扩展运算符，然后后面跟上同名属性来覆盖，例如：
```javascript
import { user, pageSet } from './../../../columns'
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
      pageSet: { ...pageSet, pageSizeOptions: ['2', '10'] }
    }
  }
```

这样就不需要在每个业务逻辑里都去定义列名，只需要在columns.js中去定义，组合，导出字段就好了。这样可能也会有不妥的地方，理论上这里应该包含这个系统中所有要显示的列名，大一点的系统如果有成千上万个字段，这里就多起来了。不过话说回来这总比在每个界面自己定义字段写的代码要少。

### 使用同一个新增弹框

新增数据，无非是一个弹出框，一个Form加上两个按钮，没有必要为每一个界面写一个，如果能给这个弹框传入属性，包含要新增的字段，点击确定的时候调用父组件中的新增方法。这样这个弹出框被公用起来，只起到收集数据，验证数据的作用。

传入要新增的字段，一样在columns.js这个文件里做文章，一般要新增的字段和显示在表里的字段是类似的，二般不一样就难办了，这样最好还是区分开来，顶多是组合字段而已。再者，如果新增的字段时间类型，下拉框选择，上传的文件，图片怎么办呢？ 可以在这个字段里加上一个type字段，表示控件类型，如下：
```javascript
const email = { title: '邮箱', dataIndex: 'email', key: 'email', type: 'input' }
const createTime = { title: '创建时间', dataIndex: 'createTime', key: 'createTime', type: 'time' }
const user = { column: props => [id, name, email, mobile, thumb, createTime, updateTime, action(props)], field: [name, email, mobile, thumb]}
```
引入field，传递给新增组件
```javascript
import { user, pageSet } from './../../../columns'
<AddComp
	field={user.field}
	showAdd={showAdd}
	onAddData={this.addUser.bind(this)}
	title={route.title}/>
```

在AddComp组件中使用传入的字段：
```html
import React, { Component } from 'react'
import { Form, Modal, Input, message } from 'antd'

class AddDataComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ showAdd: nextProps.showAdd })
  }
  // 取消，关闭，调用父组件关闭弹框
  hideModel() {
    this.props.onClose()
  }
  // 确认，调用父组件，添加数据
  confirmForm() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err)
      }
      this.props.onAddData(values)
    })
  }
  render() {
    let { showAdd } = this.state
    let { field, title } = this.props
    let { getFieldDecorator } = this.props.form
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 }}
    return <Modal
      visible={showAdd}
      title={'添加' + title}
      centered
      onCancel={this.hideModel.bind(this)}
      onOk={this.confirmForm.bind(this)}>
      <Form {...formItemLayout}>
        {field.map((f, index) => <Form.Item key={f.key} label={f.title}>
          {getFieldDecorator(f.key, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              { required: true, whitespace: true, message: `${f.title}不能为空` },
            ],
          })(<Input placeholder={'请输入' + f.title}/>)}
        </Form.Item>)}
      </Form>
    </Modal>
  }
}
const AddComp = Form.create({ name: 'add_comp' })(AddDataComp)
export default AddComp
```
未解决问题：
* 验证，不同的字段验证不同，可以在字段中传入一个RegExp来验证，复杂的验证比如密码比较，字段之间有关联的验证如何通过字段来验证，目前本人没有想到好办法
* 复杂字段，比如文件上传，传入file或者img字段可以明确表示需要上传的字段类型，这种一般是上传文件后得到一个链接，返回这个链接并吸入到数据库中，暂时没有实现
