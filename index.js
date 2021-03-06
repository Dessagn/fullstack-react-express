const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cookiesSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookiesSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKeys]
    })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
// require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);