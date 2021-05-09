const service = require('../service/index');

const get = async (req, res, next) => {
    try {
        const result = await service.getAllContacts;
        return res.status(200).json({
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
        const result = await service.getContactById(contactId);

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

const create = async (req, res, next) => {
    try {
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    try {
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const remove = async (req, res, next) => {
    const contactId = req.params;
    try {
        const result = await service.removeContact(contactId);

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

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
};
