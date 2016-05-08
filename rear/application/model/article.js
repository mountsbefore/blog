var mongoose = require('mongoose')
var ArticleSchema = require('../schema/article')
var Article = mongoose.model('Article', ArticleSchema)

module.exports = Article