const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // ?
const passport = require('passport');

const guard = require('../middlewares/guard');
const ctrlUsers = require('../controller/ctrlUsers');

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

router.post('/register', ctrlUsers.register); // /register - user registration { email, password };
router.post('/login', ctrlUsers.login); // /login - login { email, password };
router.post('/logout', guard, /*auth,*/ ctrlUsers.logout); // /logout - user logout;
router.get('/current', guard, /*auth,*/ ctrlUsers.current); // /current - get message if user is authenticated;

module.exports = router;
