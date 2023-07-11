const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const mongoose = require('mongoose');
require('./passport');

const app = express();
const { Strategy, ExtractJwt } = passportJWT;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Configure Express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());




// Set up Passport JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
};

passport.use(new Strategy(jwtOptions, (payload, done) => {
  // Perform user lookup based on payload
  const user = getUserFromDatabase(payload.id); // replace with your user lookup logic

  if (user) {
    return done(null, user);
  }
  return done(null, false);
}));

// Define routes
app.get('/', (req, res) => {
  res.json('Hello, World!');
});

// app.get('/login', (req, res) => {
//   res.send('Hello, World!');
// });

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Access granted' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});

const auth = require('./routes/auth');
const user = require('./routes/user');

app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session: false}), user);
