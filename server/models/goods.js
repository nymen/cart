let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    productId: String,  //{ type: String}
    productName: String,
    salePrice: Number,
    productImage: String,
    productNum: String,
    checked: String
});

module.exports = mongoose.model('GoodsSchema', productSchema, 'goods');
