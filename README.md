## parttimejob-全栈实践


本项目使用react+node.js做的一个全栈实践项目，前端参考了[React-Admin-Starter](https://github.com/veryStarters/react-admin-starter)这个项目，这个项目的自动配置路由，自动页面骨架的思路很新颖。后端是node.js+express提供接口访问，最主要的内容是mysql.js的使用和使用nginx反向代理来跨域。

## 前端parttime

前端基于框架[React-Admin-Starter](https://github.com/veryStarters/react-admin-starter)基本没有改动。这是一个后台管理系统，最常用的功能也就是增删改查，这里做了一些自己的调整。

### 统一的字段名
开发PC端这种后台项目，产品经理经常会提一些临时需求。比如原型上一个表格字段“编辑时间”，做到一般快结尾了或者已经快上线了，说要改成“更新时间”。这个时候就比较蛋疼了，当然最直接的办法就是Ctrl+H全局查找，一个一个替换，但是遇到新手连编辑器都不是很熟的小伙伴就要捉急了（我见过一些刚入门的小伙子，用的是vscode，还真不知道全局查找，快速跳转这些快捷键）。
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
```javascript
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
* 复杂字段，比如文件上传，传入file或者img字段可以明确表示需要上传的字段类型，这种一般是上传文件后得到一个链接，返回这个链接并写入到数据库中，暂时没有实现。

### 使用同一个搜索组件
同样，搜索也是根据几个字段来查询信息，这里我们可以把搜索分成两种类型：
* 简单搜索，按照更新时间来搜索，比如昨天，今天，当月，上月，名称搜索，其中昨天，今天，当月，上月做成tab的形式，名称直接输入框，并且回车搜索。这个能满足最普遍的搜索功能。
* 复杂搜索，简单搜索的基础上加上要搜索的字段。

简单搜索
![](https://github.com/tylerdong/parttimejob/blob/master/parttime/public/common.png)
复杂搜索
![](https://github.com/tylerdong/parttimejob/blob/master/parttime/public/complex.png)

复杂搜索中要搜索的字段照样放在common.js中，如下：
```javascript
const user = { column: props => [id, name, email, mobile, thumb, createTime, updateTime, action(props)], field: [name, email, mobile, thumb], searchField: [name, email, mobile, createTime] }
```
引用并使用：
```javascript
import { user, pageSet } from './../../../columns'
<AddComp
  field={user.field}
  showAdd={showAdd}
  onAddData={this.addUser.bind(this)}
  title={route.title}/>
```

SearchComp组件：
```javascript
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
```
这里使用onChange方法来收集搜索数据，原理是给Input组件设置name，值是key，也就是字段名，onChange方法中，使用event.target.name获取字段名字，使用event.target.value获取Input的输入值，这样组成搜索数据searchObj，最后把searchObj返回给父组件。

未解决问题：
* 时间搜索一般是一个时间段，这个暂时没有实现。
* 如果搜索条件是一个下拉框选择出来的，这个要给条件渲染成下拉框，这个暂时没有实现。

### mock数据和代理跨域
原框架提供自动生成mock文件的功能，项目启动后使用express启用了http应用（parttime\scripts\addone\mock-server.js），端口是10086，专门监听mock请求，在fetch（parttime\src\common\utils\fetch.js），proxyTable（parttime\src\rasConfig.js）中代理。如果不想走mock，就修改代理的target。不过上项目之后很少使用mock，增加了工作量不是？再说已经全栈开发了还要mock个啥呢？

## 后端parttimeApp

后端开发采用的express，mysql.js，pug实现的，注意这里主要写接口，pug模板基本上没有用到。这个子项目基本上是按照官方文档来写的。
使用express-generator来生成项目骨架，express的模板引擎好多，也不知道那个好，就按照官方文档中的例子给个pug来生成项目。项目中有个www文件，是启动文件，可以直接运行这个文件启动。

要访问接口要添加中间件body-parser，因为post，put，patch三种请求中包含请求提，node.js原生的http模块中，请求提是基于流的方式来接受，body-parser可以解析JSON，Raw，文本，URL-encoded格式的请求体。

```javascript
var bodyParser = require('body-parser');
//解析 application/json
app.use(bodyParser.json());
//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//转发api/base请求
app.use('/api/base', indexRouter);
//转发api/user请求
app.use('/api/user', usersRouter);
```

在usersRouter就是具体的接口请求了，如下：
```javascript
var express = require('express');
var router = express.Router();
var config = require('./../conf/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
```

这里简单的分了个层，和java，.net代码一样有router层（相当于业务逻辑层），dao层（数据访问层）。dao层里使用mysql.js访问mysql数据库。
这个地方说一下分页的逻辑，分页查询使用的是limit offset，pageSize方式，但是有个重要的信息要返回，就是数据行数，所以需要执行两次请求，这就意味这要使用回调嵌套了，这就不是很爽了，代码会成一坨。所幸mysql.js生成连接池的时候有个选项multipleStatements，把它设置成true，就可以一次执行两个sql语句，有点类似存储过程。

查询接口一般是select column1，column2 ... from table where column1=value1 and column2=value2 ... order by updateTime desc limit offset, pageSize，这样的，为了避免每次都拼接sql语句，这里写了一个统一处理函数，另外还使用current，pageSize生成offSet。
接口请求中出列current，pageSize，current字段之外的字段默认都是需要查询的字段，使用for...of方法轮询查询对象，生成where后缀。方法如下：

```javavscript
    paging: (sql, param) => {
        // 如果请求中有pageSize，使用current，pageSize生成offSet
        if (param.hasOwnProperty('pageSize')) {
            param.pageSize = parseInt(param.pageSize)
            param.offSet = param.current <= 1 ? 0 : (param.current - 1) * param.pageSize
        }
        for(let key in param) {
            if(!['pageSize', 'current', 'offSet'].includes(key)) {
                sql[0]+= ` AND ${key}=:${key}`
                sql[1]+= ` AND ${key}=:${key}`
            }
        }
        sql[0] += ' ORDER BY updateTime DESC LIMIT :offSet, :pageSize;'
        sql[1] += ' ORDER BY updateTime DESC;'
        return {sql: sql.join(''), param: param}
    }
```

默认情况下使用?转义，但是我觉得这种情况有点怪，例如select * from t_user where name=? and age=? and sex=?;这样要传入的参数是一个数组，并且要时刻注意数组的顺序和sql语句中?的顺序保持一致，这是不是反人类？所幸mysql.js有提供一个配置queryFormat，自定义转义，代码如下：
```javascript
queryFormat: function (sqlString, values) {
    if (!values) return sqlString;
    return sqlString.replace(/\:(\w+)/g, function (txt, key) {
	if (values.hasOwnProperty(key)) {
	    return this.escape(values[key]);
	}
	return txt;
    }.bind(this))
}
```
这个函数的原理是使用字符串的replace方法将sql语句中的:columnname替换成转义后的请求值，这样写sql语句就方便多了，select * from t_user where name=:name and age=:age and sex=:sex; 还有传入参数的时候就可以直接传入一个对象就好，例如{name: '张三', age: 18, sex: 'man'}，见名知义，岂不是很爽？

未解决问题：
* 暂时没有考虑like，between，>，<等情况。
* 这里默认接口请求传入的字段名字和数据库中表的字段名字一致，这是不安全的。
* 使用multipleStatements设置一次执行多条语句，也不是很安全，会有sql注入危险。

## 部署上线

部署上线首先要有域名和空间，这没啥好说的，就是买买买，不过域名不是必须的。
服务器我用的是阿里云的Ubuntu，要在里面安装nginx，node.js，npm，mysql，pm2或者forever。
mysql装好之后命令可以连接，查看，但是这不是影响工作效率，所有要用客户端连接，我用的是navicat for mysql。首先要在阿里云服务器里当前实例的安全组里配置端口访问规则，mysql使用的是3306，截图如下：
![](https://github.com/tylerdong/parttimejob/blob/master/parttime/public/mysqlConnection.png)
还要允许root用户从外网登陆，要修改mysql里的user表，这里不再赘述。

使用pm2启动node.js项目，防止因出错造成自动退出。pm2工具的使用就不再赘述。

最后前端使用proxyTable代理解决跨域问题的那一套，部署在服务器上就不管用了，这里没有在后端修改服务器响应头Access-Control-Allow-Origin，而是使用nginx代理，具体做法是使用vhost，将来自localhost:3332/api/路径的请求代理到本地127.0.0.1:3333。具体做法是在nginx的vhost目录下新建一个parttime.conf,内容如下：
```javascript
server {
        listen 3332;                                    # 端口
        server_name www.hzyayun.net hzyayun.net;        # 域名
        root /usr/local/app/parttime;                   # 站点根目录
        index index.html;                               # 默认首页
        location /api/ {
                proxy_pass http://127.0.0.1:3333;       # 请求转发的地址
                proxy_connect_timeout 6000;             # 连接超时设置
                proxy_read_timeout 6000;
                proxy_redirect off;                     # 不修改请求url
        }
}
```
在nginx的配置文件ngxin.conf内修改http对象，在http配置的最后一行跟上include \/etc\/nginx\/vhost\/*.conf; 然后重启nginx。最后还要开放3332，3333两个端口。如下
![](https://github.com/tylerdong/parttimejob/blob/master/parttime/public/react.png)
![](https://github.com/tylerdong/parttimejob/blob/master/parttime/public/interfaceconn.png)

最后如果想用域名访问，需要在阿里云上解析域名，需要备案，太麻烦我就没有弄，直接使用域名访问：http://120.27.214.189:3332/
