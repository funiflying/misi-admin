var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var UsersSchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    password:String,
    role:ObjectId,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
UsersSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }

    /*bcrypt.genSalt(SALT_WORK_FACTOR,function (err,salt) {
        if(err){
            return next(err);
        }
        bcrypt.hash(user.password,salt,function (err,hash) {
            user.password=hash;
            next();
        })
    })*/
    next();
})
UsersSchema.methods={
    comparePassword:function (_password,cb) {
        bcrypt.compare(_password,this.password,function (err,isMatch) {
            if(err){
                return cb(err)
            }
            return cb(null,isMatch)
        })
    }
}
UsersSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=UsersSchema;


