const User = require('../database/models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: 'username', // not necessary, DEFAULT
  },
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      console.log(user);
      if (!user) {
        console.log('incorrect username');
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.checkPassword(password)) {
        console.log('incorrect password');
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  },
);

module.exports = strategy;
