var  mongoose=require('mongoose');
var NavSchema=require('../schemas/navigation');
var Nav=mongoose.model('Nav',NavSchema);
module.exports=Nav;
