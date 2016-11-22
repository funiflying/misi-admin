var Product=require('../models/product');
var Category_Model=require('../models/category');
var Category=require('../controllers/category');
var _=require('underscore');
var qiniu=require('../utils/qiniu')
module.exports={
    create:function (req,res) {
        var _product=req.body.product;
        var _name=_product.name;
        var _id=_product._id;
        var _category_new=_product.category
        //更新
        if(_id){
            Product.findById(_id,function (err,product) {
                var _category_old=product.category;
                if(err){
                    console.log(err);
                    return res.status(500).send('系统出错了');
                }
                product=_.extend(product,_product);
                product.save(function (err) {
                    if(err){
                        console.log(err);
                        return res.status(500).send('系统出错了');
                    }
                    Category.updateWithProduct(_category_new,product._id);
                    if(_category_new.toString()!==_category_old.toString()){
                        Category.deleteWithProduct(_category_old,product._id)
                    }

                    return  res.json({
                        success:'编辑成功'
                    })
                })
            })
        }else {
            //新增
            Product.findOne({name:_name},function (err,product) {
                if(err){
                    console.log(err)
                    return res.status(500).send('系统出错了');
                }
                if(product){
                    return  res.json({
                        err:'商品已存在'
                    })
                }
                new Product(_product).save(function (err,product) {
                    if(err){
                        console.log(err);
                        return res.status(500).send('系统出错了');
                    }
                    Category_Model.findById(product.category,function (err,category) {
                        if(err){
                            console.log(err);
                            return res.status(500).send('系统出错了');
                        }
                        category.product.push(product._id);
                        category.size=category.product.length;
                        category.save(function (err) {
                            if(err){
                                console.log(err);
                                return res.status(500).send('系统出错了');
                            }
                            return  res.json({
                                success:'添加成功'
                            })
                        })
                    })
                })
            })
        }
    },
    list:function (req,res) {
        Product.fetch(function (err,products) {
            if(err){
                console.log(err);
                return res.status(500).send('系统出错了');
            }
            return res.json(products)
        })
    },
    remove:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Product.remove({_id:_id},function (err) {
                if(err){
                    console.log(err);
                    return res.status(500).send('系统出错了');
                }
                return  res.json({
                    success:'操作成功'
                })
            })
        }else {
            return  res.json({
                err:'操作的数据不存在'
            })
        }
    },
    upload:function (req,res) {
        qiniu(req,res)
    },
    detail:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Product.findOne({_id:_id},function (err,product) {
                if(err){
                    console.log(err);
                    return res.status(500).send('系统出错了');
                }
                return  res.json([product])
            })
        }else {
            return res.status(404).send('找不到资源');
        }
    },
    shelves:function (req,res) {
        var _product=req.body;
        if(_product._id){
            Product.update({_id:_product._id},{$set:{shelves:_product.shelves}},function (err) {
                if(err){
                    console.log(err);
                    return res.status(500).send('系统出错了');
                }
                return  res.json({
                    success:'操作成功'
                })
            })
        }
    }
}