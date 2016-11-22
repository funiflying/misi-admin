
var Customer=require('../models/customer');
var _=require('underscore');
var moment=require('moment');
module.exports={
    list:function (req,res) {
        var search=req.body;
        var _search={};


        for (var item in search){

            _search[item]={$regex:search[item]}
        }
        console.log(_search)
        Customer.find(_search,'-password').exec(function (err, customer) {
            if (err) {
                return res.status(500).send('系统出错了');
            }
            res.json(customer)
        })
    },
    findByName:function (req,res) {
        var _name=req.query.name;
        Customer.findOne({name:_name},function (err,user) {
            if(user){
                return res.json({
                    success:'用户存在'
                })
            }else {
                return res.json({
                    error:'用户不存在'
                })
            }
        })
    },
    info:function (req,res) {
        Customer.findById(req.session.user._id,function (err,customer) {
            res.render('info',{
                title:'用户信息',
                customer:customer
            })
        })

    },
    resetPassword:function (req,res) {
        var _id=req.body._id;
        if(!_id){
            return res.json({
                err:'请选择重置密码的账户'
            })
        }
        Customer.findOne({_id:_id},function (err,customer) {
            if(err){
                return res.status(500).send('系统出错了');
            }
            if(!customer){
                return res.json({
                    err:'账户不存在'
                })
            }else {
                customer=_.extend(customer,{password:'8888'})
                customer.save(function (err) {
                    if(err){
                        return res.status(500).send('系统出错了');
                    }
                    res.json({
                        success:'重置密码成功'
                    })
                })
            }
        })
    },

}