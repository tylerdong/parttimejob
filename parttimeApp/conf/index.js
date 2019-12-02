module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'qwerqwer',
        // password: '-@fhua&$',
        database:'dbpart',
        timezone: 'local',
        // 最大连接数，默认为10
        connectionLimit: 10,
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
    paging: query => {
        if (query.hasOwnProperty('pageSize'))  {
            query.pageSize = parseInt(query.pageSize)
            query.offSet = query.page <= 1 ? 0 : (query.page - 1) * query.pageSize
        }
        return query
    }
}
