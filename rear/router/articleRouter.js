var express = require('express');
var router = express.Router();
var Article = require('../application/controller/article')

router.post('/article/save', Article.save);
router.post("/article/search",Article.search);

module.exports = router;