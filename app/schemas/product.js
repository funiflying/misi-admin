var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;
var ProductSchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    subtitle:String,
    category:{
        type:ObjectId,
        ref:'Category'
    },
    type:String,
    material:String,
    flavor:String,
    specify:[{
        content:String,
        price:Number,
    }],
    describe:[],
    shelves:{
        type:Boolean,
        default:false
    },
    discount:Boolean,
    singkek:Boolean,
    stock:Number,
    picture:[{
        type:String
    }],
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
ProductSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.createAt=Date.now()
    }else {
        this.meta.updateAt=Date.now();
    }
    next();
})

ProductSchema.statics={
    fetch:function (cb) {
        return this.find({}).sort('serial').exec(cb)
    },
    findById:function (id,cb) {
        return this.findOne({_id:id}).exec(cb)
    }
}
module.exports=ProductSchema;


