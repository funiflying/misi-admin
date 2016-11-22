var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var MenuSchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    serial:{
        type:Number,
        default:0
    },
    navigation:[{
        type:ObjectId,
        ref:'Nav'
    }],
    icon:{
        type:String,
        default:'laptop'
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
MenuSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
})

MenuSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('serial').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=MenuSchema;


