var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Introduction to Passport' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password
  
  res.render('login', { 
    title: 'Login',
    email : email,
    password : password 
    }
  );
  
});

module.exports = router;
