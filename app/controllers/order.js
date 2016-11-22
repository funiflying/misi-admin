
var Goods=require('../models/goods');
var Order=require('../models/order');
var customer=require('../models/customer');
var address=require('../models/address');
var _=require('underscore');
var moment=require('moment')
module.exports={
    list:(req,res)=> {
        var search=req.body;
        var _search={};
        if(search.code){
            _search.code=search.code;
        }
        if(search.status>-1){
            _search.status=search.status
        }
        if(search.startDate){
            _search['meta.createAt']={
                $gt:moment(search.startDate)
            }
        }
        if(search.endDate){
            _search['meta.createAt']={
                $lt:moment(search.endDate)
            }
        }
        if(search.startDate&&search.endDate){
            _search['meta.createAt']={
                $gt:moment(search.startDate),$lt:(search.endDate)
            }
        }
        if(search.name){
            _search.name={$regex:search.name}
        }
        if(search.distribution){
            _search.distribution=search.distribution
        }
        Order.find(_search).sort({'meta.createAt':-1}).populate([
            {
                path:'goods',
                match:{
                    //name:{$regex:search.name}
                }
            },
            {path:'customer',select:'-password'},
            'address'
        ]).exec(function (err,orders) {
            if(err){
                res.send('error');
            }
            Order.count({status:0}).exec(function (err,status_0) {
                Order.count({status:3}).exec(function (err,status_3) {
                    Order.count({status:4}).exec(function (err,status_4) {
                        Order.count({status:5}).exec(function (err,status_5) {
                            res.json({
                                status_0:status_0,
                                status_3:status_3,
                                status_4:status_4,
                                status_5:status_5,
                                data:orders
                            })
                        })
                    })
                })
            })

        })
    },
    cancel:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Order.update({_id:_id,customer:req.session.user._id},{
                $set:{
                    status:21
                }
            }).exec(function (err) {
                res.json({
                    success:!err
                })
            })
        }
    },
    receive:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Order.findOne({_id:_id}).exec(function (err,order) {
                if(err){
                    res.json({
                        err:'订单不存在'
                    })
                }
                if(order.status==0){
                    Order.update({_id:_id},{
                        $set:{
                            status:order.distribution==1?3:4
                        }
                    }).exec(function (err) {
                        if(err){
                            res.json({
                                err:'操作失败'
                            })
                        }
                        res.json({
                            success:'操作成功'
                        })
                    })
                }else {
                    res.json({
                        err:'此订单已取消'
                    })
                }
            })
            
            
            

        }else{
            res.json({
                err:'操作失败'
            })
        }
    },
    deliver:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Order.findOne({_id:_id}).exec(function (err,order) {
                if(err){
                    res.json({
                        err:'订单不存在'
                    })
                }
                if(order.status==3){
                    Order.update({_id:_id},{
                        $set:{
                            status:order.distribution==1?5:4
                        }
                    }).exec(function (err) {
                        if(err){
                            res.json({
                                err:'操作失败'
                            })
                        }
                        res.json({
                            success:'操作成功'
                        })
                    })
                }else {
                    res.json({
                        err:'此订单状态已变更'
                    })
                }
            })




        }else{
            res.json({
                err:'操作失败'
            })
        }
    },
    complete:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Order.findOne({_id:_id}).exec(function (err,order) {
                if(err){
                    res.json({
                        err:'订单不存在'
                    })
                }
                if(order.status==4||order.status==5){
                    Order.update({_id:_id},{
                        $set:{
                            status:7
                        }
                    }).exec(function (err) {
                        if(err){
                            res.json({
                                err:'操作失败'
                            })
                        }
                        res.json({
                            success:'操作成功'
                        })
                    })
                }else {
                    res.json({
                        err:'此订单状态已变更'
                    })
                }
            })
        }else{
            res.json({
                err:'操作失败'
            })
        }
    },
}

