var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../../../db/knex');
var helpers = require('./helpers.js')


passport.use(new LocalStrategy( {usernameField : 'email'}, 

    function(email, password, done) {
        return knex('users').where({email : email})
                
        .then(function (data) {
            // email does not exist
            if (!data.length) {
              return done('Incorrect email');
            }
            
            // email does exist
            var user = data[0];
            
            if (helpers.comparePassword(password, user.password)) {
                console.log('user', user);
                // password is correct
                console.log('CORRECT!');
                return done(null, user);
            } else {
                // password is incorrect
                console.log('incorrect password');
                return done('Incorrect password')
            }
        })
        
        .catch(function (err) { 
            return done('Incorrect email or password');
        });
    })  
        
);


// Sets the user to "req.user" and establishes a session with a cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Used on subsequent requests to update 'req.user' and update the session
passport.deserializeUser(function(id, done) {
  // find user and return
  knex('users').where({ id : id })
  
  .then( function (data) {  
      return done(null, data[0]);
  })
  
  .catch( function ( err ) { return done(err); });
});

module.exports = passport;