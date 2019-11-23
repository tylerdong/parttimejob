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
        let processedQuery = {}, key = Object.keys(query)
        if(!(query.hasOwnProperty('pageSize') && query.hasOwnProperty('page')))
        for (let i = 0; i < key.length; i++) {
            if(key[i] === 'pageSize') {
                processedQuery.pageSize = parseInt(query.pageSize)
            } else if (key[i] === 'page') {

            } else {

            }
        }
    }
}
