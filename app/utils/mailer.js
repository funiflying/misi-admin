
var nodemailer = require('nodemailer');
module.exports=function (mailOption,callback) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('SMTP',{
        host:'smtp.163.com',
        secureConnection:true,
        port: 465,
        auth: {
            user: "funiflying",
            pass: "tobe@notobe"
        }
    });

// setup e-mail data with unicode symbols
    var _default = {
        from: 'funiflying@163.com', // sender address
        to: '', // list of receivers
        subject: '', // Subject line
        text: '', // plaintext body
        html: '' // html body
    };
    var mailOptions=Object.assign({},_default,mailOption)
// send mail with defined transport object
    transporter.sendMail(mailOptions, callback);
}
