const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../service/schemas/userSchema');
const Contact = require('../service/schemas/contactSchema');

require('dotenv').config();
const secret = process.env.SECRET;

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

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
        const newUser = new User({ username, email });
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
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Incorrect login or password',
            data: 'Bad request',
        });
    }

    const payload = {
        id: user.id,
        username: user.username,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // jwt.sign по умолчанию добавляет стандартный header вида {"alg": "HS256", "typ": "JWT"}

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
};

const logout = async (req, res, next) => {
    const { id } = req.user;

    try {
        await User.findById(id); // ? В модели User найти пользователя по _id.

        res.json({
            status: 'success',
            code: 204,
            data: 'No Content',
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
    // const { username } = req.user;
    // res.json({
    //     status: 'success',
    //     code: 200,
    //     data: {
    //         message: `Authorization was successful: ${username}`,
    //     },
    // });

    //const { id } = req.user; // ?

    try {
        const contacts = await Contact.find();
        res.json({
            status: 'success',
            code: 200,
            data: {
                contacts,
            },
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = {
    signup,
    login,
    logout,
    current,
};
