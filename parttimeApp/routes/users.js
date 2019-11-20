var express = require('express');
var router = express.Router();
var daoUser = require('./../dao/daoUser')
var result = require('./../model/result')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  daoUser.list(function (data) {
    res.json(result.createResult(true, data))
  })
});

router.post('/addUser', function (req, res, next) {
  daoUser.addUser(function (data) {

  })
})


module.exports = router;
