const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const Contact = require('../schemas/contact');
const User = require('../schemas/user');
require('dotenv').config();
const secret = process.env.SECRET;

const register = async (req, res, next) => {
  const { email, subscription, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    });
  }

  try {
    const newUser = new User({ email, subscription });
    newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isValidPassword(password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Incorrect login or password',
        data: 'Bad request',
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // jwt.sign по умолчанию добавляет стандартный header вида {"alg": "HS256", "typ": "JWT"}

    await User.updateOne({ _id: user.id }, { token });

    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { id } = req.user;

    await User.findByIdAndUpdate(
      { _id: id },
      { ...req.user.token, token: null },
      { new: true },
    ); // * В модели User найти пользователя по _id & updateTokenForUser(id, null);

    res.json({
      status: 'success',
      code: 204,
      data: 'No Content. Logout successful',
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

/* 
1. Извлечь токен из запроса
2. проверить токен на подлинность
3. найти пользователя в базе
*/
// -> если нашли - добавить его объект к запросу и передать управление основной функции-обработчику
const current = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.json({
      status: 'success',
      code: 200,
      data: {
        message: 'Authorization was successful. Congratulations!',
        contacts,
      },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
};
