const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');

const app = express();
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

// Sessions
app.use(session({
  secret: 'fraggle-rock', // pick a random string to make the hash that is generated secure
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false, // required
  saveUninitialized: false, // required
}));

// Routes
app.use('/user', user);

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
