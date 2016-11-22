var  mongoose=require('mongoose');
var GoodsSchema=require('../schemas/goods');
var Goods=mongoose.model('Goods',GoodsSchema);
module.exports=Goods;
