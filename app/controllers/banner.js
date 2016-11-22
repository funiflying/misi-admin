var Banner=require('../models/banner');
var _=require('underscore')
module.exports={
    list:function (req,res) {
        Banner.fetch(function (err,banners) {
            res.json(banners)
        })
    },
    create:function (req,res) {
        var _banner=req.body.banner;
        if(_banner._id){
            Banner.update({_id:_banner._id},{$set:_banner},function (err) {
                if(err){
                    return res.json({
                        err:'系统出错'
                    })
                }
                res.json({
                    success:'新增成功'
                })
            })
        }else {
           new Banner(_banner).save(function (err,banner) {
               if(err){
                   return res.json({
                       err:'系统出错'
                   })
               }
               res.json({
                   success:'新增成功'
               })
           })
        }

    },
    delete:function (req,res) {
        if(req.body._id){
            Banner.remove({_id:req.body._id},function (err) {
                if(err){
                    return res.json({
                        err:'系统出错'
                    })
                }
                res.json({
                    success:'操作成功'
                })
            })
        }else {
            return res.json({
                err:'操作失败'
            })
        }
    }


}