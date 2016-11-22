var  mongoose=require('mongoose');
var BannerSchema=require('../schemas/banner');
var Banner=mongoose.model('Banner',BannerSchema);
module.exports=Banner;
