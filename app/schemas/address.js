var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var AddressSchema=new Schema({
    customer:{
        type:ObjectId,
        ref:'Customer'
    },
    province:String,
    city:String,
    county:String,
    content:String,
    name:String,
    phone:String,
    default:Boolean,
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
AddressSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
})
AddressSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('meta.createAt').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=AddressSchema;


