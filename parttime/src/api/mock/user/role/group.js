/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author
*/

import sleep from 'system-sleep'
import Mock from 'mockjs'
const Random = Mock.Random

const data = Mock.mock([
  { 'id': 1, 'groupName': '系统用户', 'detail': '系统内用户', 'createTime': Random.datetime(), 'updateTime': Random.datetime() },
  { 'id': 2, 'groupName': '会员', 'detail': '系统内用户', 'createTime': Random.datetime(), 'updateTime': Random.datetime() }
])

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
      'list': data,
      'total': 2,
      'totalPages': 1
    }
  }
}
