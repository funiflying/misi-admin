var Address=require('../models/address');
var _=require('underscore');
module.exports={
    address:function (req,res) {
      Address.find({customer:req.session.user._id}).exec(function (err,addresses) {
          if(err){
              return res.status(500).send('系统出错了');
          }
          res.render('address',{
              title:'收货地址管理',
              addresses:addresses
          })
      })
    },
    create:function (req,res) {
        var _address=req.body;
        var _id=_address._id;
        _address.customer=req.session.user._id;
        if(_id){
            Address.findById(_id,function (err,address) {
                if(err){
                    console.log(err)
                    return res.status(500).send('系统出错了');
                }
                address=_.extend(address,_address)
                address.save(function (err) {
                    if(err){
                        return res.status(500).send('系统出错了');
                    }
                    return  res.json({
                        success:'编辑成功'
                    })
                })
            })
        }else {
            _address._id=null
            new Address(_address).save(function (err) {
                if(err){
                    return res.status(500).send('系统出错了');
                }
                return  res.json({
                    success:'添加成功'
                })
            })
        }




    },
    remove:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Address.remove({_id:_id},function (err) {
                if(err){
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
    }
}