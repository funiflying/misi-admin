
var qiniu = require("qiniu");
module.exports=function (req,res) {
    var options={
        akey:'dLPTUESm4M-x4dYPJFM0ZmMK4D_m0ODp6G8ovWvF',
        skey:'__T5iATe5NlFh8wJHan2T0ACjV0arSLbj5Z5JwC6',
        bucket:'product',
        file:req.files.picture.path
    }
    //需要填写你的 Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = options.akey;
    qiniu.conf.SECRET_KEY = options.skey;

//要上传的空间
   var  bucket = options.bucket;

//上传到七牛后保存的文件名
   var  key = Date.now()+'.jpg';

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
       /* putPolicy.callbackUrl = 'http://localhost:3000';
        putPolicy.callbackBody = '$(fname)';*/
        return putPolicy.token();
    }

//生成上传 Token
   var  token = uptoken(bucket, key);

//要上传文件的本地路径
   var  filePath = options.file
//构造上传函数
    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                res.send('http://ogmknj4mc.bkt.clouddn.com/'+key)
            } else {
                // 上传失败， 处理返回代码
                res.status(500).send(err.error)
            }
        });
    }

//调用uploadFile上传
    uploadFile(token, key, filePath);


}