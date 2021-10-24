const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const app = express();

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

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.use('/api/v1/assignments', );
// app.use('/api/v1/courses', );
// app.use('/api/v1/lectures', );
// app.use('/api/v1/subscriptions', );
app.use('/api/v1/users', usersAPI);

// Default error handler
app.use(require('./middleware/defaultError'));

module.exports = app;
