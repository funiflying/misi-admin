var  mongoose=require('mongoose');
var UsersSchema=require('../schemas/users');
var User=mongoose.model('User',UsersSchema);
module.exports=User;
