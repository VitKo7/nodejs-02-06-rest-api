const mongoose = require('mongoose');
const service = require('../service');

const get = async (req, res, next) => {
    try {
        const result = await service.getAllContacts();

        res.status(200).json({
            status: 'success',
            code: 200,
            data: {
                result,
            },
        });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await mongoose.isValidObjectId(contactId);

        if (result) {
            const result = await service.getContactById(contactId);

            res.status(200).json({
                status: 'success',
                code: 200,
                data: {
                    result,
                },
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with such ID: '${contactId}' not found`,
                data: 'Not Found',
            });
        }
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const create = async (req, res, next) => {
    // const { name, phone, email, favorite } = req.body;
    try {
        const result = await service.addContact(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result,
            },
        });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const update = async (req, res, next) => {
    const { contactId } = req.params;
    // const { name, phone, email, favorite } = req.body;

    try {
        const result = await service.updateContact(contactId, req.body);

        if (result) {
            res.status(200).json({
                status: 'success',
                code: 200,
                data: {
                    result,
                },
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with such ID: '${contactId}' not found`,
                data: 'Not Found',
            });
        }
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    const { contactId } = req.params;
    // const { name, phone, email, favorite } = req.body;
    const { favorite = false } = req.body;
    const { children = false } = req.body;

    try {
        const result = await service.updateContact(contactId, {
            favorite,
            children,
        });

        if (result) {
            res.status(200).json({
                status: 'success',
                code: 200,
                data: {
                    result,
                },
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with such ID: '${contactId}' not found`,
                data: 'Not Found',
            });
        }
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const remove = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const result = await mongoose.isValidObjectId(contactId);

        if (result) {
            const result = await service.removeContact(contactId);

            res.status(200).json({
                status: 'success',
                code: 200,
                data: {
                    result,
                },
            });
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Contact with such ID: '${contactId}' not found`,
                data: 'Not Found',
            });
        }
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
};
