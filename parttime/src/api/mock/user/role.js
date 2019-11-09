/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author xiexp
*/

import sleep from 'system-sleep'
import Mock from 'mockjs'

const Random = Mock.Random

let dataList = []
for (let i = 0; i < 12; i++) {
  let template = {
    'id': Random.natural(1, 1000),
    'roleName': Random.csentence(2, 5),
    'detail': Random.csentence(8, 20),
    'createTime': Random.datetime(),
    'updateTime': Random.datetime()
  }
  dataList.push(template)
}

export default (req, res, next) => {
  // 模拟网络环境，延迟100ms返回
  sleep(100)
  return {
    'pageIndex': req.page,
    'pageSize': req.pageSize,
    'list': dataList,
    'total': 12,
    'totalPages': 1
  }
}
