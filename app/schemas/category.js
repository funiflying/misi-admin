var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var CategorySchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    subtitle:String,
    product:[{
        type:ObjectId,
        ref:'Product'
    }],
    serial:{
        type:Number,
        default:0
    },
    size:{
        type:Number,
        default:0
    },
    cover:String,
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
CategorySchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
})

CategorySchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('serial').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=CategorySchema;


