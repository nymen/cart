let express = require('express');
let router = express.Router();
let Users = require('./../models/users');
require('./../utils/util');

router.post('/checkLogin', function (req, res, next) {
  if (req.cookies.user) {
    //对user信息查数据校验是否存在
    resultHandler(req, res, {userId: req.cookies.user.userId});
  }
});

router.post('/login', function (req, res, next) {
  let userName = req.body.userName;
  let userPwd = req.body.userPwd;
  if (userName && userPwd) {
    resultHandler(req, res, {userName, userPwd});
  }
});

router.post('/logout', function (req, res, next) {
  res.cookie('user', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '',
    result: ''
  });
});

//获取购物车信息
router.post('/cartList', function (req, res, next) {
  let userId = req.cookies.user.userId;
  Users.findOne({userId}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '',
        result: userDoc
      });
    }
  });
});

//删除商品：post方式取参数req.body.参数名
router.post('/deleteProduct', function (req, res, next) {
  let userId = req.cookies.user.userId;
  let productId = req.body.productId;
  Users.update({userId}, {$pull: {cartList: {productId}}}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '',
        result: 'success'
      });
    }
  });
});

//编辑购物车：数量和选中状态
router.post('/editCartList', function (req, res, next) {
  let userId = req.cookies.user.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;
  Users.update({
    userId, 'cartList.productId': productId
  }, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, (error, doc) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '',
        result: 'success'
      });
    }
  });
  /*Users.findOne({userId}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      if (userDoc) {
        let cartList = userDoc.cartList;
        cartList.forEach((product) => {
          if (product.productId === productId) {
            product.productNum = productNum;
          }
        });
        saveHandler(res, userDoc);
      }
    }
  });*/
});

//选中所有
router.post('/checkedAll', function (req, res, next) {
  let userId = req.cookies.user.userId;
  let checked = req.body.checked ? '1' : '0';
  Users.findOne({userId}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      if (userDoc) {
        let cartList = userDoc.cartList;
        cartList.forEach((product) => {
          product.checked = checked;
        });
        saveHandler(res, userDoc);
      }
    }
  });
});

//获取用户地址信息
router.get('/userAddress', function (req, res, next) {
  let userId = req.cookies.user.userId;
  Users.findOne({userId}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '',
        result: userDoc.addressList
      });
    }
  });
});

//设置默认地址
router.post('/address/setDefault', function (req, res, next) {
  let userId = req.cookies.user.userId;
  let addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1001',
      msg: '默认地址未传',
      result: ''
    });
  }
  Users.findOne({userId}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      if (userDoc) {
        let addressList = userDoc.addressList;
        addressList.forEach((address) => {
          if (address.addressId === addressId) {
            address.isDefault = true;
          } else {
            address.isDefault = false;
          }
        });
        saveHandler(res, userDoc);
      }
    }
  });
});

//删除地址
router.post('/address/delete', function (req, res, next) {
  let userId = req.cookies.user.userId;
  let addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1001',
      msg: '默认地址未传',
      result: ''
    });
  }
  Users.update({userId}, {$pull: {addressList: {addressId}}}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '',
        result: 'success'
      });
    }
  });
});

//生成确认订单信息
router.post('/payment', function (req, res, next) {
  let userId = req.cookies.user.userId;
  let addressId = req.body.addressId;
  let orderTotal = req.body.orderTotal;
  Users.findOne({userId}, (error, userDoc) => {
    if (errorHandler(error, res)) {
      if (userDoc) {
        let address = userDoc.addressList.filter((address) => {
          return address.addressId === addressId;
        });
        let goodsList = userDoc.cartList.filter((goods) => {
          return goods.checked === '1';
        });
        userDoc.cartList = userDoc.cartList.filter((goods) => {
          return goods.checked === '0';
        });
        let platformCode = '622';
        let r1 = Math.floor(Math.random() * 10);
        let r2 = Math.floor(Math.random() * 10);
        let sysDate = new Date().Format('yyyyMMddhhmmss');
        let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        let orderId = platformCode + r1 + sysDate + r2;
        let order = {
          orderId: orderId,
          addressInfo: address[0],
          goodsList: goodsList,
          orderTotal: orderTotal,
          orderStatus: '1',
          createDate: createDate
        };
        userDoc.orderList.push(order);
        userDoc.save((error, result) => {
          if (errorHandler(error, res)) {
            res.json({
              status: '0',
              msg: '',
              result: {
                orderId: orderId
              }
            });
          }
        });
      }
    }
  })
});

//获取订单详情
router.get('/orderDetail', function (req, res, next) {
  let userId = req.cookies.user.userId;
  let orderId = req.param('orderId');
  Users.findOne({userId}, (err, userDoc) => {
    if (errorHandler(err, res)) {
      let orderList = userDoc.orderList;
      if (orderList) {
        let orderTotal = 0;
        orderList.forEach((order) => {
          if (order.orderId === orderId) {
            orderTotal = order.orderTotal;
          }
        });
        res.json({
          status: '0',
          msg: '',
          result: {
            orderId: orderId,
            orderTotal: orderTotal
          }
        });
      }
    } else {
      res.json({
        status: '100001',
        msg: '用户没有订单！！',
        result: ''
      });
    }
  })
});

saveHandler = (res, doc) => {
  doc.save((error, result) => {
    if (errorHandler(error, res)) {
      res.json({
        status: '0',
        msg: '',
        result: doc
      });
    }
  });
};

errorHandler = (error, res) => {
  if (error) {
    res.json({
      status: '1',
      msg: error.message || '加入失败！！',
      result: ''
    });
    return false;
  }
  return true;
};

resultHandler = (req, res, param) => {
  Users.findOne(param, (error, doc) => {
    if (error) {
      res.json({
        status: '1',
        msg: error
      });
    } else if (doc) {
      res.cookie('user', {userId: doc.userId, userName: doc.userName}, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      //req.session.user = doc;
      res.json({
        status: '0',
        msg: '',
        result: doc.userName
      });
    } else {
      res.json({
        status: '2',
        msg: '用户名或密码错误！！',
        result: ''
      });
    }
  });
};

module.exports = router;
