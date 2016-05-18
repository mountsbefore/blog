"use strict"
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var  db_connect_str = "mongodb://localhost/test"
var mongoose = require('mongoose');
var fs = require('fs')
var path = require('path')

// models loading
var models_path = __dirname + '/application/model'
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file
      var stat = fs.statSync(newPath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(newPath)
        }
      }
      else if (stat.isDirectory()) {
        walk(newPath)
      }
    })
}
walk(models_path)


mongoose.connect(db_connect_str);//；连接数据库

var MongoStore = require('connect-mongo')(session)
var router = express.Router();
var app = express();
app.use(cookieParser("secret"));


app.use(session({
	secret: '12345',
	name: 'testapp',
	cookie: {maxAge: 30*60*1000 },
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({   //创建新的mongodb数据库
         url:db_connect_str
     })
}));

app.get("/test",function(req,res){
	res.json({test:"success"})
})
console.log(__dirname + '../'+'frontEnd' )
// app.use(express.static("/Users/myapple/Desktop/blog/frontEnd"));
// app.use(express.static(__dirname + "/../frontEnd"));
app.use(express.static('public'));

var userRouter = require("./router/userRouter.js");
var articleRouter = require("./router/articleRouter.js")

app.use(function(req,res,next){
	res.setHeader("access-control-allow-origin","*");
	next();
})
app.use(userRouter);
app.use(articleRouter);



var server = app.listen(8080, function () {

  var host = server.address().address || "localhost";
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})