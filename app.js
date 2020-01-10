const config = {
    host: 'localhost',
    port: 5432,
    database: 'buddy_pass',
    user: 'postgres',
    password: '',
};

const express = require('express');
const axios = require('axios');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || config);

const Sequelize = require('sequelize')

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


require('dotenv').config();

const loginRouter = require('./routes/login');

//create app
const app = express();

// view engine setup
app.set('view engine', 'ejs');

// import settings from .env file or ENV variables

// look for static files in the 'public' folder
app.use(express.static(__dirname + 'public'));
// set up other express middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

// Express and Passport Session
const session = require('express-session');
app.use(
  session({
    secret: process.env.APP_SECRET || 'abcdefg',
    resave: true,
    saveUninitialized: true
  })
);

// require passport and the Strategies used
const passport = require('passport');
const Strategy = require('passport-strategy');
const LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: `${process.env.APP_URL}/auth/linkedin/callback`,
      scope: ['r_emailaddress', 'r_liteprofile']
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

// serialize = parse and store data in session
passport.serializeUser(function(user, done) {
  // this function should strip down the user object to something that can be stored in the session
  // for now, we will just use the whole user object but it should probably be just the id
  // null is for errors
  done(null, user);
});

// deserialize = fetch serialized data from session and find the full user object
passport.deserializeUser(function(serializedUser, done) {
  // this function takes the serialized data and should expand it into a full user object
  // for example, maybe you are going to get the user from the database by id?
  // null is for errors
  const user = serializedUser;
  done(null, user);
});

app.get(
  '/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE' }),
  function(req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  }
);

// the login callback:

app.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.use('/login', loginRouter);

app.get('/', function(req, res) {
  res.send('Hello Leah!');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

module.exports = app;
