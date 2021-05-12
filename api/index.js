const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const ctrlUsers = require('../controller/ctrlUsers');
const ctrlContacts = require('../controller/ctrlContacts');

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};

router.post('/signup', ctrlUsers.signup); // /users/signup - user registration { email, password };

router.post('/login', ctrlUsers.login); // /users/login - login { email, password };

router.post('/logout', auth, ctrlUsers.logout); // /users/logout - user logout;

router.get('/current', auth, ctrlUsers.current); // /users/current - get message if user is authenticated;

////

router.get('/', ctrlContacts.get);
router.get('/:contactId', ctrlContacts.getById);
router.post('/', ctrlContacts.create);
router.put('/:contactId', ctrlContacts.update);
// router.patch('/:contactId/favorite', ctrlContacts.updateStatus);
router.patch('/:contactId', ctrlContacts.updateStatus);
router.delete('/:contactId', ctrlContacts.remove);

module.exports = router;
