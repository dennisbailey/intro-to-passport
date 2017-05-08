var express = require('express');
var router = express.Router();
var passport = require('../lib/auth.js');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../../../db/knex');
var helpers = require('../lib/helpers.js');
var bcrypt = require('bcrypt');

router.get('/', helpers.ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Introduction to Passport', user : req.user });
});

router.get('/login', function(req, res, next) {
  console.log(req.flash());
  res.render('login', { message : req.flash('message') });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  })(req, res, next);
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
  
  // hash and salt the password
  var hash = helpers.hashPassword(req.body.password);
    
  knex('users').insert( { email : req.body.email, password : hash} )
  .whereNotExists(function() {
      return this.select(Knex.raw(1)).from('users').where({ email : email });
  })
 
//   return knex('users').where({email : req.body.email})
//   
//   .then( function () {  
//      if (data.length) { 
          //return an error
//           res.send('oh noes')
//         } else {
//           // Insert new user
//         }
//   })
//   
//   .catch(function () {  
//     var newUser = {}
//     newUser.email = req.body.email;
//     newUser.password = req.body.password
//     
//     return knex('users').insert(newUser)
//     
  .then( function () {
      req.flash('message', 
        { 
          status : 'success', 
          message : 'Welcome!'
        } 
      )    
      return res.redirect('/');
  })    
  
  .catch( function ( errors ) { 
      return next(errors); 
  });  
  
});

router.get('logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
})


module.exports = router;
