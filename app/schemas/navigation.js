var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var NavSchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    url:String,
    serial:Number,
    menu:{
        type:ObjectId,
        ref:'Menu'
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
NavSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
})

NavSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('serial').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=NavSchema;


