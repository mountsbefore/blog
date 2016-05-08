var express = require('express');
var router = express.Router();
var User = require('../application/controller/user')

router.post('/user/signup', User.signup);
router.post("/user/signin",User.signin);
module.exports = router;