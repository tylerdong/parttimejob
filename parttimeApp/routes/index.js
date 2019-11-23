var express = require('express');
var router = express.Router();
var result = require('./../model/result')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/initState', function (req, res, next) {
  let data = {
    permission: {
      1: true,
      2: true,
      3: false
    }
  }
  res.json(result.createResult(true, data))
})

module.exports = router;
