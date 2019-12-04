## parttimejob-全栈实践


本项目使用react+node.js做的一个全栈实践项目，前端参考了[React-Admin-Starter](https://github.com/veryStarters/react-admin-starter)这个项目，这个项目的自动配置路由，自动页面骨架的思路很新颖。后端是node.js+express提供接口访问，最主要的内容是mysql.js的使用和使用nginx反向代理来跨域。

## 前端parttime

1. 前端基于框架[React-Admin-Starter](https://github.com/veryStarters/react-admin-starter)基本没有改动。这是一个后台管理系统，最常用的功能也就是增删改查，这里做了一些自己的调整。

2. 开发PC端这种后台项目，产品经理经常会提一些比较临时需求。比如原型上一个表格字段“编辑时间”，做到一般快结尾了或者已经快上线了，说要改成“更新时间”。这个时候就比较蛋疼了，当然最直接的办法就是Ctrl+H全局查找，一个一个替换，但是遇到新手连编辑器都不是很熟的小伙伴就要捉急了（我见过一些刚入门的小伙子，用的是vscode，还真不知道全局查找，快速跳转这些快捷键）。
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


