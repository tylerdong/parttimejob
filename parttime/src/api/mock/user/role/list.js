/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author xiexp
*/

import sleep from 'system-sleep'
import Mock from 'mockjs'

const Random = Mock.Random

let dataList = [
  { 'id': 1, 'roleName': '管理员', 'detail': '管理员', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 2, 'roleName': '运维', 'detail': '运维', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 3, 'roleName': '市场', 'detail': '市场', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 4, 'roleName': 'seo', 'detail': 'seo', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 5, 'roleName': '市场部组长', 'detail': '市场部组长', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 6, 'roleName': '市场部推广', 'detail': '系统管理员', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 7, 'roleName': '合作商', 'detail': '系统管理员', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 8, 'roleName': '前台', 'detail': '系统管理员', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 9, 'roleName': 'HR', 'detail': '系统管理员', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 10, 'roleName': '会员', 'detail': '系统管理员', 'createTime': Random.datetime(), 'updateTime': Random.datetime() }
]

export default (req, res, next) => {
  // 模拟网络环境，延迟100ms返回
  sleep(100)
  return {
    success: true,
    code: 0,
    msg: '成功',
    data: {
      'pageIndex': req.page,
      'pageSize': req.pageSize,
      'list': dataList,
      'total': 12,
      'totalPages': 1
    }
  }
}
