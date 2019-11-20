var sql = {
    user: {
        list: `select * from t_user`,
        add: `INSERT INTO t_user(name, mobile, email, thumb)  VALUES (?, ?, ?, ?)`
    }
}
module.exports = sql
