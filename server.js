require('babel-register');

var mongoose=require('mongoose');
var  Users=require( './app/controllers/users');
var  Menu=require( './app/controllers/menu');
var  Nav=require( './app/controllers/navigation');
var  Role=require( './app/controllers/role');
var  Category=require( './app/controllers/category');
var  Product=require( './app/controllers/product');
var  Order=require( './app/controllers/order');
var  Customer=require( './app/controllers/customer');
var  Banner=require( './app/controllers/banner');
const webpack = require('webpack');
var bodyParser=require("body-parser");
var cookieParser=require('cookie-parser');
var session=require('express-session');
var multipart=require("connect-multiparty")
var mongoStore=require('connect-mongo')(session);

const path=require('path');
const express = require('express');
var http = require('http');
const app=express();
const config=require('./webpack.config');
const port=process.env.PORT||4000;
const DB_URL='mongodb://localhost/misi';
mongoose.connect(DB_URL);
app.use(multipart())
app.use(session({
    secret:"misi-admin",
    store:new mongoStore({
        url:DB_URL,
        collection:"session"
    })
}))
app.set("views","./app/views/pages");
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public")));
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment=!isProduction;


// Webpack developer
if (isDevelopment) {
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}
//  RESTful API
const publicPath = path.resolve(__dirname);
app.use(bodyParser.urlencoded({
    extended:true,
    verify: function (req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use(bodyParser.json({ type: 'application/json',limit : '500000kb' }))
app.use(express.static(publicPath));


app.use(function(req, res, next) {
    var _user = req.session.admin||{};
    var _path=req.path
    if(_path.match(/^\/api/g)&&!req.session.admin){
       res.status(403).send('您没有权限');
    }
    if(_path.match(/^\/admin/g)&&!req.session.admin){
        res.redirect('/login')
    }
    next()
})
app.get('/admin/*',function (req,res) {
    res.sendFile(path.resolve(__dirname, '', 'admin.html'))
});

app.get('/login',function (req,res) {
    delete req.session.admin;
    res.render('login',{
        user:{name:'',password:''},
        title:'用户登录'
    })
})

app.get('/',function (req,res) {
    res.render('login',{
        user:{name:'',password:''},
        title:'用户登录'
    })
})
//user
app.post('/login',Users.login);
app.post('/api/user/create',Users.create);
app.get('/api/user/list',Users.list);
app.post('/api/user/remove',Users.remove);
//menu
app.post('/api/menu/create',Menu.create)
app.get('/api/menu/list',Menu.list);
app.get('/api/menu/all',Menu.getAllMenu);
app.post('/api/menu/remove',Menu.remove)
//navigation
app.post('/api/navigation/create',Nav.create);
app.get('/api/navigation/list',Nav.list);
app.post('/api/navigation/remove',Nav.remove)
//role
app.post('/api/role/create',Role.create);
app.get('/api/role/list',Role.list);
app.post('/api/role/remove',Role.remove);
//category
app.post('/api/category/create',Category.create)
app.get('/api/category/list',Category.list);
app.post('/api/category/remove',Category.remove)
//product
app.post('/api/product/create',Product.create)
app.get('/api/product/list',Product.list);
app.post('/api/product/remove',Product.remove);
app.post('/api/product/upload',Product.upload);
app.post('/api/product/detail',Product.detail);
app.post('/api/product/shelves',Product.shelves);
//order
app.post('/api/order/list',Order.list);
app.post('/api/order/receive',Order.receive);
app.post('/api/order/deliver',Order.deliver);
app.post('/api/order/complete',Order.complete);
//customer
app.post('/api/customer/list',Customer.list);
app.post('/api/customer/reset',Customer.resetPassword)
//banner
app.post('/api/banner/create',Banner.create)
app.get('/api/banner/list',Banner.list)
app.post('/api/banner/delete',Banner.delete)
// 404
app.get('*', function(req, res){
    res.render('404', {
        title: 'No Found'
    })
});

var server = http.createServer(app);
server.listen(port,function (err, result) {
    if(err){
        console.log(err);
    }
    console.log('Server running on port --' + port);
})
