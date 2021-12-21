const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const config = require('./config');
const app = express();

// Catch errors thrown in async functions
require('express-async-errors');

const {
  assignmentsAPI,
  coursesAPI,
  courseCategoriesAPI,
  courseLanguagesAPI,
  lecturesAPI,
  subscriptionsAPI,
  usersAPI,
} = require('./routes');

app
  .use(express.urlencoded({extended: false}))
  .use(express.json())
  .use(fileUpload())
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

app.use('/api/v1/assignments', assignmentsAPI);
app.use('/api/v1/courses', coursesAPI);
app.use('/api/v1/courseCategories', courseCategoriesAPI);
app.use('/api/v1/courseLanguages', courseLanguagesAPI);
app.use('/api/v1/lectures', lecturesAPI);
app.use('/api/v1/subscriptions', subscriptionsAPI);
app.use('/api/v1/users', usersAPI);
app.get('/api/v1/ping', (req, res) => {
  res.success({pong: true});
});

// Default error handler
app.use(require('./middleware/defaultError'));

module.exports = app;
