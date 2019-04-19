let mongoose = require('mongoose');
let Users = require('./../models/users');
let Goods = require('./../models/goods');
let express = require('express');
let router = express.Router();
//对于有账号密码的是mongodb://admin:admin@127.0.0.1/mycart
mongoose.connect('mongodb://127.0.0.1:27017/mycart');
//数据库链接有三种结果，链接成功，链接失败，断开链接
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.');
});

mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.');
});

mongoose.connection.on('error', function () {
  console.log('MongoDB connected error.');
});
//get方式去参数用req.param
router.get('/', function (req, res, next) {
  //后端分页和排序
  let filter = JSON.parse(req.param('filter'));
  let pageNumber = Number(req.param('pageNumber'));
  let pageSize = Number(req.param('pageSize'));
  let sort = req.param('sort');
  let skip = (pageNumber - 1) * pageSize;
  let param = {};
  if (filter.hasOwnProperty('priceStart') && filter.hasOwnProperty('priceEnd')) {
    param = {
      salePrice: {
        $gt: filter.priceStart,
        $lte: filter.priceEnd
      }
    };
  }
  //Goods.find({}, ()=>{})
  let goodsModel = Goods.find(param).skip(skip).limit(pageSize).sort({'salePrice': sort});
  goodsModel.exec((error, doc) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  });
});

//post方式取参数req.body.参数名
router.post('/addToCart', function (req, res, next) {
  let userId = req.body.userId;
  let productId = req.body.productId;
  Users.findOne({userId}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      if (userDoc) {
        let tempGoods = userDoc.cartList.filter((goods) => {
          return goods.productId === productId;
        });
        if (tempGoods.length === 1) {
          tempGoods[0].productNum = Number(tempGoods[0].productNum) + 1;
          saveHandler(res, userDoc);
        } else {
          Goods.findOne({productId}, (error, goodsDoc) => {
            if (errorHandler(error, res)) {
              goodsDoc.checked = 1;
              goodsDoc.productNum = 1;
              userDoc.cartList.push(goodsDoc);
              saveHandler(res, userDoc);
            }
          })
        }
      }
    }
  });
});


saveHandler = (res, doc) => {
  doc.save((error, result) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '加入成功！！',
        result: 'success'
      });
    }
  });
};

errorHandler = (error, res) => {
  if (error) {
    res.json({
      status: '1',
      msg: error.message || '加入失败！！'
    });
    return false;
  }
  return true;
};

module.exports = router;
