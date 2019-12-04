var mysql = require('mysql')
var sql = require('./sql')
var config = require('./../conf/index')
var pool = mysql.createPool(config.mysql)

module.exports = {
    list: function (param, cb) {
        let strSql = ['SELECT * FROM t_user WHERE 1=1', 'SELECT COUNT(*) AS total FROM t_user WHERE 1=1']
        let query = config.paging(strSql, param)
        pool.query(query.sql, query.param, (error, result) => {
            if (error) { throw error; }
            cb({data: result[0], total: result[1][0].total});
        })
    },
    addUser: function (param, cb) {
        pool.query(sql.user.add, param, (error, result) => {
            if (error) throw  error
            cb(result);
        })
    },
    roleList: (param, cb) => {
        let strSql = ['SELECT * FROM t_role WHERE 1=1', 'SELECT COUNT(*) AS total FROM t_role WHERE 1=1']
        let query = config.paging(strSql, param)
        pool.query(query.sql, query.param, (error, result) => {
            if(error) throw error
            cb({data: result[0], total: result[1][0].total});
        })
    },
    addRole: (param, cb) => {
        pool.query(sql.user.addRole, param, (error, result) => {
            if(error) throw error
            cb(result)
        })
    },
    // 删除角色
    deleteRole: (param, cb) => {
        pool.query(sql.user.deleteRole, param, (error, result) => {
            if(error) throw error
            cb(result)
        })
    },
    // 查找角色组
    roleGroupList: (param, cb) => {
        let strSql = ['SELECT * FROM t_group WHERE 1=1', 'SELECT COUNT(*) AS total FROM t_group WHERE 1=1']
        let query = config.paging(strSql, param)
        pool.query(query.sql, query.param, (error, result) => {
            if (error) { throw error; }
            cb({data: result[0], total: result[1][0].total});
        })
    },
    addRoleGroup: (param, cb) => {
        pool.query(sql.user.addRoleGroup, param, (error, result) => {
            if(error) throw error
            cb(result)
        })
    }
}
