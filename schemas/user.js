const mongoose = require('mongoose');
const { Schema } = mongoose;
const bCrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      default: 'Guest',
    },

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other', 'none'],
        message: "This gender isn't allowed",
      },
      default: 'none',
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minlength: 5,
      maxlength: 70,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 3,
      maxlength: 70,
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

    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {
          protocol: 'http',
          s: '100',
          r: 'pg',
          d: 'wavatar',
        });
      },
    },
  },
  { versionKey: false, timestamps: true },
);

// засолка пароля
userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

// валидация пароля, возвращает: true || false
userSchema.methods.isValidPassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
