let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPwd: String,
  orderList: Array,
  cartList: [
    {
      productId: String,
      productName: String,
      salePrice: Number,
      productImage:String,
      productNum: String,
      checked: String
    }
  ],
  addressList: [
    {
      addressId : String,
      userName : String,
      streetName : String,
      postCode : Number,
      tel : Number,
      isDefault : Boolean
    }
  ]
});

module.exports = mongoose.model('User', userSchema, 'users');
