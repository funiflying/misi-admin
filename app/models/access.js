var  mongoose=require('mongoose');
var AccessSchema=require('../schemas/access');
var Access=mongoose.model('Access',AccessSchema);
module.exports=Access;
