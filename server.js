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

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
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
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 3000;
const { DB_HOST } = process.env;

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// mongoose.disconnect(); // ! where & how to use?

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
