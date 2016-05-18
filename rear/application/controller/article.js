var mongoose = require('mongoose')
var User = mongoose.model('User');
var Article = mongoose.model('Article')
var xls = require("node-xlsx")
var ccap = require('ccap')();

exports.save = function (req,res){
	var art = req.query.article;
	console.log(art,"art.....")
	if(req.session.user){
		var user = req.session.user._id;
		art = JSON.parse(art);
		art.user = user;
		// article = new Article({
		// 	name:"test first",
		// 	content:"from first test ",
		// 	user:req.session.user._id
		// })
		console.log(art,"art....2")
		var article = new Article(art);

		article.save(function(err,article){
			if(err){console.log(err)}
			console.log(article,"article.....")
		})
	}
	res.json({save:"success"});
}
exports.search = function (req,res){
	console.log("insearch")
	var user = req.session.user;
	if (user) {
		console.log("in")
		Article.find({})//查找的条件
		// .populate("user","name",{name:"ssp8"},{limit:5})//这里的是填充显示user对象哪些字段。model,field ,match option
		.populate("user","name",{name:user.name})//这里的是填充显示user对象哪些字段。
		.exec(function(err,doc){
			if (err) {console.log(err)};
			console.log("exec....");
			console.log(doc,"doc....")
			res.json(doc);
		})
	}else{
		res.json({error:"user isn't login"});
	};

}
//__dirname  是当前代码页面大相对位置。
exports.getExcel = function (req,res){
    var list = xls.parse(__dirname + '/品种交接.xlsx');
    console.log(JSON.stringify(list));
    res.json(JSON.stringify(list));
}
exports.getImage = function (req,res){
	var ary = ccap.get();
	var txt = ary[0];

    var buf = ary[1];
    console.log(txt,buf);
    res.end(buf);
}

/*
Story
.find(...)
.populate({
  path: 'fans', model
  match: { age: { $gte: 21 }}, strict
  select: 'name -_id',
  options: { limit: 5 }
})
.exec()

*/
