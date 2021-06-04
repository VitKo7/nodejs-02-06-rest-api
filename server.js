const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());

require('./config/config-passport');

const contactsRouter = require('./routes/contactsRouter');
const usersRouter = require('./routes/usersRouter');

app.use('/api/contacts', contactsRouter);
app.use('/api', usersRouter);

app.use(express.static(`${__dirname}/public`));
app.get('/', (req, res, next) => {
  res.send('Home page');
});

app.use(function (req, res, next) {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on other routes... ;) ',
    // message: 'Use api on routes: /api/contacts',
    // message: `Use api on routes:
    //         /api/signup - user registration {email, password}
    //         /api/login - login {email, password}
    //         /api/logout - user logout
    //         /api/current - get message if user is authenticated`,
    data: 'Not found',
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);

  res.status(err.status || 500);
  res.json({
    status: err.status,
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;
const { DB_HOST } = process.env;

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise, // using Node.js' native promises in Mongoose 5 syntax,
  //'mongoose.Promise = global.Promise' - syntax of Mongoose 4 was released before ES6, had its own promise implementation
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `------- Server is running. API is used on port: ${PORT} ------- `,
      );
      console.log('Database connection successful!');
    });
  })
  .catch(error => {
    `Server is not running. Error message: ${error.message}`;
    console.error('error :', error);
    process.exit(1); // to exit with a 'failure' code; Catchall для общих ошибок
  });
