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


router.get('/logout', function(req, res, next) {
  res.redirect('/');
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


router.post('/register', function(req, res, next) {
  
  var email = req.body.email;
  var password = req.body.password
  
  res.render('register', { 
    title: 'Register',
    email : email,
    password : password 
    }
  );
  
});


module.exports = router;
