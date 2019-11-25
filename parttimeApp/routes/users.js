var express = require('express');
var router = express.Router();
var daoUser = require('./../dao/daoUser')
var result = require('./../model/result')
var config = require('./../conf/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//获取用户菜单
router.get('/menus', function (req, res, next) {
    let data = [
        { key: 'index', title: '首页', icon: 'home', url: '/' },
        {
            key: 'user',
            title: '用户管理',
            icon: 'user',
            url: '/user',
            children: [
                { key: 'user-auth', title: '权限', icon: 'build', url: '/user/auth' },
                { key: 'user-role', title: '角色', icon: 'api', url: '/user/role' },
                { key: 'user-roleGroup', title: '用户组', icon: 'api', url: '/user/roleGroup' },
                { key: 'user-list', title: '用户', icon: 'user', url: '/user/list' }
            ]
        },
        { key: 'demo', title: '系统用法示例', icon: 'solution', url: '/demo' }
    ]
    res.json(result.createResult(true, data))
})

// 分页查询用户
router.get('/list', function (req, res, next) {
    daoUser.list(config.paging(req.query), data => res.json(result.createResult(true, data)))
});

// 添加用户
router.post('/addUser', function (req, res, next) {
    // 从请求中获得参数
    daoUser.addUser(req.body, function (data) {
        res.json(result.createResult(true, data))
    })
})

// 分页查询角色
router.get('/role/list', (req, res, next) => {
    daoUser.roleList(config.paging(req.query),data => res.json(result.createResult(true, data)))
})

// 添加角色
router.post('/role/add', (req, res, next) => {
    daoUser.addRole(req.body, data => res.json(result.createResult(true, data)))
})


module.exports = router;
