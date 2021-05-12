const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,

        email: {
            type: String,
            minlength: 5,
            maxlength: 70,
            unique: true,
            required: [true, 'Email is required'],
            validate(value) {
                const re = /\S+@\S+\.\S+/;
                return re.test(String(value).toLowerCase());
            },
        },

        password: {
            type: String,
            minlength: 3,
            maxlength: 70,
            required: [true, 'Password is required'],
        },

        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },

        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
