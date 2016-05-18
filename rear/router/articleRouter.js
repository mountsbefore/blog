var express = require('express');
var router = express.Router();
var Article = require('../application/controller/article')

router.post('/article/save', Article.save);
router.post("/article/search",Article.search);
router.post("/article/getExcel",Article.getExcel);
router.get("/article/getImage",Article.getImage);
module.exports = router;