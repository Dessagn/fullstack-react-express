const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const userFound = await User.findOne({ googleId: profile.id});
            if(userFound) {
                // already have user with specified ID in document
                done(null, userFound);
                //console.log(userFound.email);
            }else{
                // user is new. We create a new record
                const user = await new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                }).save();
                done(null, user);
            }
    })
);
