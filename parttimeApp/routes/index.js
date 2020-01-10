var express = require('express');
var router = express.Router();
var result = require('./../model/result');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
// 指定文件上传路径
var upload = multer({dest: path.join(__dirname, './../public/upload/tmp')});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/initState', function (req, res, next) {
  let data = { permission: { 1: true, 2: true, 3: false } }
  res.json(result.createResult(true, data))
})

// 文件上传
router.post('/singleFile', upload.single('file'), function (req, res, next) {
  if(req.body.fileLocation) {
    const newName = req.file.path.replace(/tmp/, req.body.fileLocation) + path.parse(req.file.originalname).ext
    const fileName = req.file.filename + path.parse(req.file.originalname).ext
    fs.rename(req.file.path, newName, err => {
      if (err) {
        res.json(result.createResult(false, { message: err.message }))
      } else {
        res.json(result.createResult(true, { path: `${req.body.fileLocation}/${fileName}` }))
      }
    })
  } else {
    res.json(result.createResult(false, {message: '未指定文件路径'}))
  }
})


module.exports = router;
