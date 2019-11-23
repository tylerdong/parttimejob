var mysql = require('mysql')
var sql = require('./sql')
var config = require('./../conf/index')
var pool = mysql.createPool(config.mysql)

module.exports = {
    list: function (callback) {
        pool.query(sql.user.list, function (error, result) {
            if (error) throw error;
            callback(result);
        });
    },
    addUser: function (param, callback) {
        pool.query(sql.user.add, param, function (error, result) {
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
    }
}
