var mongoose = require('mongoose')
var Category = mongoose.model('Category')

exports.save = function(req, res) {
  var _category = req.body.category
  var category = new Category(_category)

  category.save(function(err, category) {
    if (err) {
      console.log(err)
    }

    res.json({
    	success:"success"
    });
  })
}