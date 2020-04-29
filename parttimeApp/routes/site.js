const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '首页',
    banner: [
      {bannerImg: './img/banner/banner1.png', title: '微信小程序解决方案', subTitle: '十年开发经验　专业技术'},
      {bannerImg: './img/banner/banner1.png', title: '微信小程序解决方案', subTitle: '十年开发经验　专业技术'},
      {bannerImg: './img/banner/banner1.png', title: '微信小程序解决方案', subTitle: '十年开发经验　专业技术'}
    ] })
});

module.exports = router;
