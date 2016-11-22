
var User=require('../models/users');
var _=require('underscore');
module.exports={
    login:function (req,res) {
        var _user=req.body.user;
        var _name=_user.name;
        var _password=_user.password;
        User.findOne({name:_name},function (err,user) {
          if(err){
              console.log(err);return res.status(500).send('系统出错了');
          }
          if(!user){
              res.render('login',{
                  title:'用户登录',
                  user:_user,
                  message:'用户不存在'
              })
          }else {
              user.comparePassword(_password,function (err,isMatch) {
                  if(err){
                      return res.status(500).send('系统出错了');
                  }
                  if(true){
                      res.cookie("UID",user.name)
                      req.session.admin=user;
                      res.redirect("/admin/home")
                  }else {
                      res.render('login',{
                          title:"用户登录",
                          user:_user,
                          message:"密码不匹配"
                      })
                  }

              })
          }
        })
    },
    create:function (req,res) {
        var _user=req.body.user;
        var _name=_user.name;
        var _id=_user._id;
        //更新
        if(_id){
            User.findById(_id,function (err,user) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
                }
                user=_.extend(user,_user)
                user.save(function (err) {
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
            User.findOne({name:_name},function (err,user) {
                if(err){
                    console.log(err);return res.status(500).send('系统出错了');
                }
                if(user){
                    return  res.json({
                        err:'用户已存在'
                    })
                }
                new User(_user).save(function (err) {
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
        User.find({},'-password').populate([{
            path:'role',
            select:'name',
            model:'Role'
        }]).exec(function (err, users) {
            if (err) {
                console.log(err);return res.status(500).send('系统出错了');
            }
            res.json(users)
        })
    },
    remove:function (req,res) {
        var _id=req.body._id;
        if(_id){
            User.remove({_id:_id},function (err) {
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