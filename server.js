const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.json());
app.use(cors());
app.use(logger(formatsLogger));

const routerApi = require('./api');
app.use('/api/contacts', routerApi);

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on routes: /api/contacts',
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
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false, // ! where & how to use?
});

// mongoose.disconnect(); // ! where & how to use?

connection
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running. API is used on port: ${PORT}`);
        });
    })
    .catch((error) => `Server is not running. Error message: ${error.message}`);