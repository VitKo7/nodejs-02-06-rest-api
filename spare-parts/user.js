const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

userSchema.methods.setPassword = function (password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;

//! --- server.js ---
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//! --- Настройка Passport перед роутингом ---
app.use(
    session({
        secret: 'secret-word',
        key: 'session-key',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: null,
        },
        saveUninitialized: false,
        resave: false,
    })
);

require('./config/config-passport');

app.use(passport.initialize());
app.use(passport.session());
