
var Role=require('../models/role');
var _=require('underscore');
module.exports={
    create:function (req,res) {
        var _role=req.body.role;
        var _name=_role.name;
        var _id=_role._id;
        //更新
        if(_id){
            Role.findById(_id,function (err,role) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
                }
                role=_.extend(role,_role)
                role.save(function (err) {
                    if(err){
                        console.log(err);return res.status(500).send('系统出错了');
                    }
                    return  res.json({
                        success:'编辑成功'
                    })
                })
            })
        }else {
            //新增
            Role.findOne({name:_name},function (err,role) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
                }
                if(role){
                    return  res.json({
                        err:'名称已存在'
                    })
                }
                new Role(_role).save(function (err,role) {
                    if(err){
                        console.log(err);return res.status(500).send('系统出错了');
                    }
                    return  res.json({
                        success:'添加成功'
                    })
                })
            })
        }
    },
    list:function (req,res) {
        Role.find({}).populate([
            {
                path:'access',
                select:'name'
            }
        ]).exec(function (err,roles) {
            if(err){
                console.log(err);return res.status(500).send('系统出错了');
            }
            return res.json(roles)
        })
    },
    remove:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Role.remove({_id:_id},function (err) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
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