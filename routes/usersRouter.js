const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // ?
const passport = require('passport');

const validate = require('../middlewares/usersValidation');
const guard = require('../middlewares/guard');
const ctrlUsers = require('../controller/ctrlUsers');
const upload = require('../middlewares/upload');
const updateAvatar = require('../controller/updateAvatar');

// const auth = (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (!user || err) {
//       return res.status(401).json({
//         status: 'error',
//         code: 401,
//         message: 'Unauthorized',
//         data: 'Unauthorized',
//       });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// };

router.post('/register', validate.validateCreateUser, ctrlUsers.register); // /register - user registration { email, password };
router.post('/login', validate.validateLoginUser, ctrlUsers.login); // /login - login { email, password };
router.post('/logout', guard, /*auth,*/ ctrlUsers.logout); // /logout - user logout;
router.get('/current', guard, /*auth,*/ ctrlUsers.current); // /current - get message if user is authenticated;

router.patch(
  '/avatar',
  guard,
  upload.single('avatar'),
  validate.validateUploadAvatar,
  updateAvatar,
); // /avatar - change user's avatar;

module.exports = router;
