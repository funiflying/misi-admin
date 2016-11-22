var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var GoodsSchema=new Schema({
    product:{
        type:ObjectId,
        ref:'Product'
    },
    name:String,
    cover:String,
    sid:ObjectId,
    customer:{
        type:ObjectId,
        ref:'Customer'
    },
    specify:String,
    count:Number,
    price:Number,
    total:Number,
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
GoodsSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
})
GoodsSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('meta.createAt').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=GoodsSchema;


