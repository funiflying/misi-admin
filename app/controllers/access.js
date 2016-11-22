
var Access=require('../models/access')

module.exports={
    create:function (access) {
        new Access(access).save(function (err,access) {
            if(err){
                return false
            }
            return true
        })

    }
}