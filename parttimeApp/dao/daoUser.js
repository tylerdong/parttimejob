var mysql = require('mysql')
var sql = require('./sql')
var config = require('./../conf/index')
var pool = mysql.createPool(config.mysql)

module.exports = {
    list: function (param, callback) {
        let strSql = 'SELECT * FROM t_user WHERE 1=1'
        if(param.hasOwnProperty('name')) strSql += ' AND name=:name'
        if(param.hasOwnProperty('mobile')) strSql += ' AND mobile=:mobile'
        if(param.hasOwnProperty('email')) strSql += ' AND email=:email'
        if(param.hasOwnProperty('pageSize')) strSql += ' LIMIT :offSet, :pageSize'
        pool.query(config.paging(strSql), param, (error, result) => {
            if (error) { throw error; }
            callback(result);
        });
    },
    addUser: function (param, callback) {
        pool.query(sql.user.add, param, (error, result) => {
            if (error) throw  error
            callback(result);
        })
    },
    roleList: (param, cb) => {
        pool.query(sql.user.roleList, param, (error, result) => {
            if(error) throw error
            cb(result)
        })
    },
    addRole: (param, cb) => {
        pool.query(sql.user.addRole, param, (error, result) => {
            if(error) throw error
            cb(result)
        })
    },
    // 查找角色组
    roleGroupList: (param, cb) => {
        let strSql = 'SELECT * FROM t_group WHERE 1=1'
        if(param.hasOwnProperty('pageSize')) strSql += ' LIMIT :offSet, :pageSize'
        pool.query(config.paging(strSql), param, (error, result) => {
            if (error) { throw error; }
            cb(result);
        })
    },
    addRoleGroup: (param, cb) => {
        pool.query(sql.user.addRoleGroup, param, (error, result) => {
            if(error) throw error
            cb(result)
        })
    }
}
