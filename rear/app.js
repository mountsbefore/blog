"use strict"
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var  db_connect_str = "mongodb://localhost/test"
var mongoose = require('mongoose');

var User = require("./application/model/user");

mongoose.connect(db_connect_str);//；连接数据库

var MongoStore = require('connect-mongo')(session)
var router = express.Router();
var app = express();
app.use(cookieParser("secret"));


app.use(session({
	secret: '12345',
	name: 'testapp',
	cookie: {maxAge: 80000 },
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({   //创建新的mongodb数据库
         url:db_connect_str
     })
}));

app.use(express.static('public'));
// app.set("views","/")
var userRouter = require("./router/userRouter.js")

app.use(function(req,res,next){
	res.setHeader("access-control-allow-origin","*");
	next();
})
app.use(userRouter)



var server = app.listen(8080, function () {

  var host = server.address().address || "localhost";
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})