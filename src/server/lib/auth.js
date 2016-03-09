var passport = require('pasport');
var LocalStrategy = require('passport-local').Strategy;
var knex = require('knex');

passport.use(new LocalStrategy(
  function(email, password, done) {
    
    var usersearch = return knex('users').where('email', email);
    
    if (usersearch)    
//     User.findOne({ email: email }, function (err, email) {
//       if (err) { return done(err); }
//       if (!email) { return done(null, false); }
//       if (!email.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
  }
));
