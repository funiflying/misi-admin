var Menu=require('../models/menu');
var Role=require('../models/role');
var _=require('underscore');
module.exports={
    create:function (req,res) {
        var _menu=req.body.menu
        var _name=_menu.name;
        var _id=_menu._id;
        //更新
        if(_id){
            Menu.findById(_id,function (err,menu) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
                }
                menu=_.extend(menu,_menu)
                menu.save(function (err) {
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
            Menu.findOne({name:_name},function (err,menu) {
                if(err){
                      console.log(err);return res.status(500).send('系统出错了');
                }
                if(menu){
                    return  res.json({
                        err:'名称已存在'
                    })
                }
                new Menu(_menu).save(function (err) {
                    if(err){
                         console.log(err);
                        return res.status(500).send('系统出错了');
                    }
                    return  res.json({
                        success:'添加成功'
                    })
                })
            })
        }



    },
    list:function (req,res) {
        var opts = [{
            path   : 'navigation',
            select : 'name url serial',
            options:{
                sort:'serial',

            }
        }];
        Menu.find({}).populate(opts).sort('serial').exec(function (err,menus) {
            if(err){
                 console.log(err);return res.status(500).send('系统出错了');
            }
            return res.json(menus)
        })
    },
    remove:function (req,res) {
        var _id=req.body._id;
        if(_id){
            Menu.remove({_id:_id},function (err) {
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



    },
    getAllMenu:function (req,res) {

        Menu.find({}).sort('serial').exec(function (err,menus) {
            if(err){
                 console.log(err);return res.status(500).send('系统出错了');
            }
            Role.findOne({_id:req.session.admin.role}).populate([{
                path   : 'access',
                select : 'name url menu',
            }]).exec(function (err,role) {
                var accesses=role.access||[];
                var _menus=[];
                menus.map((menu)=>{
                    var _m={
                        _id:menu._id,
                        name:menu.name,
                        serial:menu.serial,
                        nav:[],
                        icon:menu.icon
                    }
                    accesses.map((access)=>{
                        if(access.menu.toString()==menu._id.toString()){
                            _m.nav.push(access)
                        }
                     })
                    if(_m.nav.length){
                        _menus.push(_m)
                    }
                })
                return res.json(_menus)

            })

        })
    }
}