var sql = {
    user: {
        list: `select * from t_user`,
        add: 'INSERT INTO t_user(name, mobile, email, thumb)  VALUES (:name, :mobile, :email, :thumb)',
        roleList: `SELECT * FROM t_role LIMIT :offset, :pageSize`,
        addRole: 'INSERT INTO t_role(roleName, `describe`) VALUES (:roleName, :describe)'
    }
}
module.exports = sql
