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
    addUser: function (callback) {
        pool.query(sql.user.add, function (error, result) {
            if (error) throw  error
            callback(result)
        })
    }
}
