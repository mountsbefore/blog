var mongoose = require('mongoose')
var User = mongoose.model('User')

// signup
// exports.showSignup = function(req, res) {
//   res.render('signup', {
//     title: '注册页面'
//   })
// }

// exports.showSignin = function(req, res) {
//   res.render('signin', {
//     title: '登录页面'
//   })
// }

exports.signup = function(req, res) {
  console.log(req.query)
  // console.log(req);
  var _user = req.query.user
  _user = JSON.parse(_user)

  User.findOne({name: _user.name},  function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      return res.json({
        "error":"name has exist"
      })
    }
    else {
      console.log(_user,"_user........")
      user = new User(_user)
      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }

        res.josn({result:"success"})
      })
    }
  })
}

// signin
exports.signin = function(req, res) {
  var _user = req.query.user
  _user = JSON.parse(_user);
  var name = _user.name
  var password = _user.password

  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err)
    }

    if (!user) {
      return res.json({"error":"user isn't exist"})
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }

      if (isMatch) {
        req.session.user = user

        return res.json({result:"success"})
      }
      else {
        return res.json({"error":"password wrong"})
      }
    })
  })
}

// logout
exports.logout =  function(req, res) {
  delete req.session.user
  //delete app.locals.user

  res.redirect('/')
}

// userlist page
exports.list = function(req, res) {
  User.fetch(function(err, users) {
    if (err) {
      console.log(err)
    }

    res.render('userlist', {
      title: 'imooc 用户列表页',
      users: users
    })
  })
}

// midware for user
// exports.signinRequired = function(req, res, next) {
//   var user = req.session.user

//   if (!user) {
//     return res.redirect('/signin')
//   }

//   next()
// }

// exports.adminRequired = function(req, res, next) {
//   var user = req.session.user

//   if (user.role <= 10) {
//     return res.redirect('/signin')
//   }

//   next()
// }