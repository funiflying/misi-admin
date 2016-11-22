var  mongoose=require('mongoose');
var MenuSchema=require('../schemas/menu');
var Menu=mongoose.model('Menu',MenuSchema);
module.exports=Menu;
