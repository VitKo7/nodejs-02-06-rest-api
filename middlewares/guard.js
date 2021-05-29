const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
require('dotenv').config();
const secret = process.env.SECRET;

const isVerifyToken = token => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return false;
  }
};

const guard = async (req, res, next) => {
  //   console.log(req.headers);
  const headerAuth = req.get('authorization');

  let isValidToken = false;
  let token = null;

  if (headerAuth) {
    token = headerAuth.split(' ')[1]; // Bearer ggkjGSGGS12...
    isValidToken = isVerifyToken(token);
  }

  if (!isValidToken) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const decodeToken = jwt.decode(token);
  const user = await User.findOne({ _id: decodeToken.id });

  if (!user || user.token !== token) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  req.user = user;
  next();
};

module.exports = guard;
