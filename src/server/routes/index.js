var express = require('express');
var router = express.Router();
var passport = require('../lib/auth.js');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../../../db/knex');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Introduction to Passport' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});


router.get('/logout', function(req, res, next) {
  res.redirect('/');
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});


router.post('/register', function(req, res, next) {
  // check for a unique email
    // if email is in the db tell the user
    // if the email is not in the db insert it
 
  return knex('users').where({email : req.body.email})
  
  .then( function () {  
    res.render ('register', {
      title : 'Register',
      message : 'email already exists' 
    })
  })
  
  .catch(function () {  
    var newUser = {}
    newUser.email = req.body.email;
    newUser.password = req.body.password
    
    return knex('users').insert(newUser)
    
    .then( function () {    
      res.render('/');
    })    
    
    .catch( function ( errors ) { 
      return next(errors); 
    });  
    
  })

  
});


module.exports = router;
