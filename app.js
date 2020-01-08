const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// include routes -- use with templating
// const index = require('./routes/index');
// const users = require('./routes/users');

const app = express();

// view engine setup

app.set('view engine', 'ejs');

// import settings from .env file or ENV variables
require('dotenv').config();

// require passport and the Strategies used
const passport = require('passport');
const LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;


passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_API_KEY,
    clientSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: `${process.env.APP_URL}/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
    process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
    });
}));


// Express and Passport Session
const session = require('express-session');
app.use(session({
    secret: process.env.APP_SECRET || 'abcdefg',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

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
    const user = serializedUser
    done(null, user);
});

// set up other express middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// look for static files in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// use the route files
//app.use('/', index);
//app.use('/users', users);

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
    res.render('error');
});

app.get("/", function(req, res, next) {
    console.log('you are here!');
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listening on port 3000");
})

module.exports = app;
