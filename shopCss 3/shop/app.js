// app.post('/upload', function(req, res){    
// 	var form = new formidable.IncomingForm({uploadDir: './lib/uploadFile/'});   //创建上传表单
//     form.encoding = 'utf-8';		//设置编辑
//     form.uploadDir = 'lib/uploadFile';	 //设置上传目录
//     form.keepExtensions = true;	 //保留后缀
//     form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

//     form.parse(req, function(err, fields, files) {
//     	console.log(2)
//   	var filesTmp = JSON.stringify(files,null,2);
//   	if(err){
//         console.log('parse error: ' + err);
//       } else {
//         console.log('parse files: ' + filesTmp);
//         var inputFile = files.inputFile[0];
//         console.log(inputFile,"inputFile")
//         var uploadedPath = inputFile.path;
//         console.log(uploadedPath,"uploadedPath")
//         var dstPath = './lib/uploadFile/' + inputFile.originalFilename;
//         //重命名为真实文件名
//         fs.rename(uploadedPath, dstPath, function(err) {
//           if(err){
//             console.log('rename error: ' + err);
//              res.status(500).json({success:"failed"});     
//           } else {
//             console.log('rename ok');
//              res.status(200).json({success:"success"});     
//           }
//         });
//       }
//   })

// // form.parse(req, function(err, fields, files) {
// //   	console.log(2)
// //     if (err) {
// //     	console.log(err)
// //       res.locals.error = err;
// //       res.render('index', { title: TITLE });
// //       return;		
// //     }  
     
// //     var extName = '';  //后缀名
// //     switch (files.fulAvatar.type) {
// //       case 'image/pjpeg':
// //         extName = 'jpg';
// //         break;
// //       case 'image/jpeg':
// //         extName = 'jpg';
// //         break;		 
// //       case 'image/png':
// //         extName = 'png';
// //         break;
// //       case 'image/x-png':
// //         extName = 'png';
// //         break;		 
// //     }
// // 	console.log(3)
// //     if(extName.length == 0){
// //     	console.log(4)
// //         res.locals.error = '只支持png和jpg格式图片';
// //         res.render('index', { title: TITLE });
// //         return;				   
// //     }

// //     var avatarName = Math.random() + '.' + extName;
// //     var newPath = form.uploadDir + avatarName;
// //     console.log(newPath);
// //     fs.renameSync(files.fulAvatar.path, newPath);  //重命名
// //   });

// //   // res.render('index', { title: TITLE });	
// //   res.status(200).json({success:"success"});     
// });

// var server = app.listen(8080, function () {

//   var host = server.address().address || "localhost";
//   var port = server.address().port;

//   console.log("应用实例，访问地址为 http://127.0.0.1:8080", host, port)

// })


var express = require('express');                                                                                                                                                                                                                                           
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var bodyParser = require("body-parser");

var fs = require('fs');
var app = express();
app.use(express.static("./"));
app.use(bodyParser());



//can't work
 app.post('/file-upload', function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
  // var form = new multiparty.Form({uploadDir: './lib/uploadFile/'});
   var tmp_path = req.files.thumbnail.path;
    // 指定文件上传后的目录 - 示例为"images"目录。 
    var target_path = './lib/uploadFile/' + req.files.thumbnail.name;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
      // 删除临时文件夹文件, 
      fs.unlink(tmp_path, function() {
         if (err) throw err;
         res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
      });
    });});

 /* 上传 can work*/  
 app.post('/file/uploading', function(req, res, next){
 	console.log("file.....");
  console.log(req.body)
  console.log(req.files,"uploading....")
   //生成multiparty对象，并配置上传目标路径
   var form = new multiparty.Form({uploadDir: './lib/uploadFile/'});
   //上传完成后处理
   form.parse(req, function(err, fields, files) {
   	console.log("parse")
   	console.log(fields,"fields...")
   	console.log(files,"files...")
     // var filesTmp = JSON.stringify(files,null,2);
 
     // if(err){
     //   console.log('parse error: ' + err);
     // } else {
     //   console.log('parse files: ' + filesTmp);
     //   var inputFile = files;
     //   var uploadedPath = inputFile.path;
     //   var dstPath = './lib/uploadFile/' + inputFile.originalFilename;
     //   //重命名为真实文件名
     //   fs.rename(dstPath, dstPath, function(err) {
     //     if(err){
     //       console.log('rename error: ' + err);
     //     } else {
     //       console.log('rename ok');
     //     }
     //   });
     // }
     res.json({success:"success..."})
  });
 });
 var server = app.listen(18888, function () {

  var host = server.address().address || "localhost";
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://127.0.0.1:18888", host, port)

})

