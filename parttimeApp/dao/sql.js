var sql = {
    user: {
        list: `SELECT * FROM t_user WHERE 1=1 `,
        add: 'INSERT INTO t_user(name, mobile, email, thumb)  VALUES (:name, :mobile, :email, :thumb)',
        roleList: `SELECT * FROM t_role ORDER BY updateTime DESC LIMIT :offSet, :pageSize`,
        addRole: 'INSERT INTO t_role(roleName, `describe`) VALUES (:roleName, :describe)',
        deleteRole: 'DELETE FROM t_role WHERE id=:id',
        addRoleGroup: 'INSERT INTO t_group(groupName, `describe`) VALUES (:groupName, :describe)'
    }
}
module.exports = sql
