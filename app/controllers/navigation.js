var Nav=require('../models/navigation');
var Menu=require('../models/menu');
var _=require('underscore');
module.exports={
    create:function (req,res) {
        var _nav=req.body.navigation
        var _name=_nav.name;
        var _id=_nav._id
        //更新
        if(_id){
            Nav.findById(_id,function (err,nav) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
                }
                nav=_.extend(nav,_nav)
                nav.save(function (err) {
                    if(err){
                        console.log(err);return res.status(500).send('系统出错了');
                    }
                    return  res.json({
                        success:'编辑成功'
                    })
                })
            })
        }else{
            Nav.findOne({name:_name},function (err,nav) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
                }
                if(nav){
                    return  res.json({
                        err:'名称已存在'
                    })
                }
                else {
                    nav=new Nav(_nav)
                    nav.save(function (err,nav) {
                        if(err){
                            console.log(err);return res.status(500).send('系统出错了');
                        }
                        Menu.findById(_nav.menu,function (err,menu) {
                            if(err){
                                return  res.json({
                                    err:err
                                })
                            }
                            menu.navigation&&menu.navigation.push(nav._id);
                            menu.save(function (err,menu) {
                                if(err){
                                    console.log(err);return res.status(500).send('系统出错了');
                                }
                                return  res.json({
                                    success:'添加成功'
                                })
                            })
                        })

                    })

                }
            })
        }

    },
    list:function (req,res) {
        var opts = [{
            path   : 'menu',
            select : 'name _id',
            options:{
                sort:'serial'
            }
        }];
        Nav.find({}).populate(opts).sort('serial').exec(function (err,navs) {
            if(err){
                console.log(err);return res.status(500).send('系统出错了');
            }
            return res.json(navs)
        })
    },
    remove:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Nav.remove({_id:_id},function (err) {
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