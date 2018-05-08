const User = require('../database/models/user');
const BasicStrategy = require('passport-http').BasicStrategy;

const strategy = new BasicStrategy(
  {
    usernameField: 'username', // not necessary, DEFAULT
  },
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      console.log(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  },
);

module.exports = strategy;
