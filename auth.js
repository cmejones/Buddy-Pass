// require passport and the Strategies used
const passport = require('passport');
const Strategy = require('passport-strategy');
const LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser')
//const models = require('./models');
const db = require('./models');

const setupAuth = (app) => {
    app.use(cookieParser());
    app.use(session({
        secret: process.env.APP_SECRET || 'abcdefg',
        resave: true,
        saveUninitialized: true
    }));

    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LINKEDIN_KEY,
                clientSecret: process.env.LINKEDIN_SECRET,
                callbackURL: `${process.env.APP_URL}/auth/linkedin/callback`,
                scope: ['r_emailaddress', 'r_liteprofile']
            },
            function(accessToken, refreshToken, profile, done) {
            console.log('logged in');
            //check user table for anyone with a profile.id in the 'linkedin' column
            return db.users
                .findOne({
                where: {
                    provider: 'LinkedIn',
                    'profile.id': profile.id
                }
                })
                .then(function(user) {
                //No user was found... so create a new user with values from LinkedIn
                if (!user) {
                    const newUser = new db.users({
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    photo: profile.photos[1].value,
                    //now in the future searching on db.users.findOne({provider: 'LinkedIn', 'profile.id': profile.id } will match because of these next 2 lines
                    provider: 'LinkedIn',
                    profile: profile._profileJson
                    });
                    // console.log('new user');
                    return newUser.save();
                } else {

                    console.log(profile);
                    console.log('Profile photo: ' + profile.photos[1].value);
                    return user;
                }
                })
                .then(user => {
                    done(null, user);
                })
                .catch(err => {
                    done(err);
                });
            }
        )
    );

    // serialize = parse and store data in session
    passport.serializeUser(function(user, done) {
    // this function should strip down the user object to something that can be stored in the session
    // for now, we will just use the whole user object but it should probably be just the id
    // null is for errors
        done(null, user.id);
    });

    // deserialize = fetch serialized data from session and find the full user object
    passport.deserializeUser(function(serializedUserId, done) {
    // this function takes the serialized data and should expand it into a full user object
    // for example, maybe you are going to get the user from the database by id?
    // null is for errors
        const user = db.users.findOne({where: {id: serializedUserId}})
        .then(user => {
            // if (!user) {
            //     // no user
            // }
            done(null, user);
        });
    });

    //initialize passport middleware
    app.use(passport.initialize());

    //register with express
    app.use(passport.session());
    
    //register routes
    app.get('/login', passport.authenticate('linkedin'));

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
            successRedirect: '/profile',
            failureRedirect: '/login'
        })
    );

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

module.exports = setupAuth;