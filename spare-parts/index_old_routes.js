const express = require('express');
const router = express.Router();
const contacts = require('../model/index');

const checkIdAvailiable = async (req) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    return result;
};

router.get('/', async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        return res.json({
            status: 'success',
            code: 200,
            data: {
                result,
            },
        });
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.get('/:contactId', async (req, res, next) => {
    try {
        // const { contactId } = req.params;
        // const result = await contacts.getContactById(contactId);

        const result = await checkIdAvailiable(req);

        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with such ID: '${req.params.contactId}' not found`,
                data: 'Not Found',
            });
        } else {
            return res.json({
                status: 'success',
                code: 200,
                data: {
                    result,
                },
            });
        }
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.delete('/:contactId', async (req, res, next) => {
    try {
        const result = await checkIdAvailiable(req);

        const { contactId } = req.params;
        const listAfterDeletion = await contacts.removeContact(contactId);

        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with such ID: '${req.params.contactId}' not found`,
                data: 'Not Found',
            });
        } else {
            return res.json({
                status: 'success',
                code: 200,
                data: {
                    listAfterDeletion,
                },
            });
        }
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.json({
                status: 'error',
                code: 400,
                message: 'Missing required field',
            });
        } else {
            const result = await contacts.addContact(req.body);
            return res.json({
                status: 'success',
                code: 201,
                data: {
                    result,
                },
            });
        }
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

router.patch('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const { name, email, phone } = req.body;

        const result = await checkIdAvailiable(req);

        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with such ID: '${req.params.contactId}' not found`,
                data: 'Not Found',
            });
        } else if (!name || !email || !phone) {
            return res.json({
                status: 'error',
                code: 400,
                message: 'Missing required field',
            });
        } else {
            const listAfterUpdate = await contacts.updateContact(
                contactId,
                req.body
            );

            return res.json({
                status: 'success',
                code: 200,
                data: {
                    listAfterUpdate,
                },
            });
        }
    } catch (e) {
        console.error(e.message);
        next(e);
    }
});

module.exports = router;
