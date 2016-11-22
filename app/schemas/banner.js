var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var BannerSchema=new Schema({
    url:String,
    link:String,
    serial:Number,
    caption:String,
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
BannerSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
})

BannerSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('serial').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=BannerSchema;


