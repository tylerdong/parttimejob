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
    'name': Random.name(),
    'email': Random.email(),
    'thumb': Random.image('200x100'),
    'createTime': Random.datetime(),
    'updateTime': Random.datetime()
  }
  dataList.push(template)
}

export default (req, res, next) => {
  // 模拟网络环境，延迟100ms返回
  sleep(100)
  console.log(req)
  // let [index, size, total] = [req.page, req.pageSize, dataList.length]
  // let totalPages = dataList.length % size === 0 ? (total / size) : Math.ceil(total / size)
  // let list = dataList.slice(index * size, (index + 1) * size)
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
