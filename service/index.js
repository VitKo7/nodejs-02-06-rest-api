const Contact = require('./schemas/contactSchema');

const getAllContacts = async () => {
    return Contact.find();
};

const getContactById = async (id) => {
    return Contact.findById(id);
};

const addContact = async (fields) => {
    return Contact.create(fields);
};

const updateContact = async (id, fields) => {
    return Contact.findByIdAndUpdate(id, fields, { new: true });
};

const removeContact = async (id) => {
    return Contact.findByIdAndRemove(id);
};

module.exports = {
    getAllContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
};
