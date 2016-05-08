var mongoose = require('mongoose')
var User = mongoose.model('User');
var Article = mongoose.model('Article')


exports.save = function (req,res){
	if(req.session.user){

		console.log("req.session.user :",req.session.user);
		console.log(req.session.user._id,"_id......")
		article = new Article({
			name:"test first",
			content:"from first test ",
			user:req.session.user._id
		})
		article.save(function(err,article){
			if(err){console.log(err)}
			console.log(article,"article.....")
		})
	}
	res.json({save:"run..."});
}
exports.search = function (req,res){
	console.log("insearch")
	if (req.session.user) {
		console.log("in")
		Article.find({name:"test first"})//查找的条件
		// .populate("user","name",{name:"ssp8"},{limit:5})//这里的是填充显示user对象哪些字段。model,field ,match option
		.populate("user","name",{name:"ssp7"})//这里的是填充显示user对象哪些字段。
		.exec(function(err,doc){
			if (err) {console.log(err)};
			console.log("exec....");
			console.log(doc,"doc....")
			res.json(doc);
		})
	};

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
