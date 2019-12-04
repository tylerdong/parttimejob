module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '123',
        database:'dbpart',
        timezone: 'local',
        // 最大连接数，默认为10
        connectionLimit: 10,
        // 允许执行多条语句
        multipleStatements: true,
        queryFormat: function (sqlString, values) {
            if (!values) return sqlString;
            return sqlString.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this))
        }
    },
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
}
