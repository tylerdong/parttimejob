module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'qwerqwer',
        database:'dbpart',
        timezone: 'local',
        // 最大连接数，默认为10
        connectionLimit: 10,
        queryFormat: function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this))
        }
    },
    paging: query => {
        query.offSet = query.page <= 1 ? 0 : (query.page - 1) * query.pageSize
        query.pageSize = parseInt(query.pageSize)
        query.page = parseInt(query.page)
        return query
    }
}
