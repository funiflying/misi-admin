var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var moment=require("moment")
var OrderSchema=new Schema({
    code:{
        type:String,
        unique:true
    },
    name:String,
    customer:{
        type:ObjectId,
        ref:'Customer'
    },
    total:Number,
    goods:[{
        type:ObjectId,
        ref:'Goods'
    }],
    distribution:{
        type:Number,
        default:1
    },//配送方式：1-送货上门，2-买家自提
    status:{
        type:Number,
        default:0
    },//订单状态：0-已提交、3-已确认、4-买家自提、5-待发货、7-配送中、9-已完成、21-已取消、23-已退货
    pay:{
        type:Number,
        default:0
    },//支付方式 0-货到付款
    address:{
        type:ObjectId,
        ref:'Address'
    },
    note:String,
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
OrderSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
});
OrderSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort({'meta.createAt':-1}).exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=OrderSchema;


