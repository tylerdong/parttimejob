var mysql = require('mysql')
var sql = require('./sql')
var config = require('./../conf/index')
var pool = mysql.createPool(config.mysql)

module.exports = { 
    menu: function (cb) {
        let menu = '[key: "index"]'
        cb(menu)
    }
}
