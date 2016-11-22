var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var CustomerSchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    password:String,
    phone:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    verify:{
        type:Boolean,
        default:false
    },
    action:String,
    avatar:{
        type:String,
        default:'/images/avatar.png'
    },
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
CustomerSchema.pre('save',function (next) {
    var customer=this;
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }

    bcrypt.genSalt(10,function (err,salt) {
        if(err){
            return next(err);
        }
        bcrypt.hash(customer.password,salt,function (err,hash) {
            customer.password=hash;
            next();
        })
    })
})
CustomerSchema.methods={
    comparePassword:function (_password,cb) {
        bcrypt.compare(_password,this.password,function (err,isMatch) {
            if(err){
                return cb(err)
            }
            return cb(null,isMatch)
        })
    }
}
CustomerSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('meta.updateAt').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=CustomerSchema;


