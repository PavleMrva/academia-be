const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config');
const app = express();

// Catch errors thrown in async functions
require('express-async-errors');

const {usersAPI} = require('./routes');

app
  .use(express.urlencoded({extended: false}))
  .use(express.json())
  .use(require('./middleware/expressPinoLogger'))
  .use(require('response-time')());

if (config.dev) {
  app.use(morgan('dev'));
}

require('./middleware/responses')(app);

if (config.dev) {
  app.use(require('./middleware/apiKeyCheck'));
} else {
  app.use('/api', require('./middleware/jwtCheck'));
}

app.use(passport.initialize());
require('./middleware/passport')();

// app.use('/api/v1/assignments', );
// app.use('/api/v1/courses', );
// app.use('/api/v1/lectures', );
// app.use('/api/v1/subscriptions', );
app.use('/api/v1/users', usersAPI);
app.get('/api/v1/ping', (req, res) => {
  res.success({pong: true});
});

// Default error handler
app.use(require('./middleware/defaultError'));

module.exports = app;
