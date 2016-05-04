var express = require('express');
var router = express.Router();
var User = require('../application/controller/user')

router.post('/user/signup', User.signup);
module.exports = router;