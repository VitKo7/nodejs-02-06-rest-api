const fs = require('fs').promises;
const path = require('path');
const contactSchema = require('./contactSchema');

// const contacts = require("./contacts.json"); // ! и как его использовать?

const contactsPath = path.join(__dirname, 'contacts.json');

const readList = async () => {
    const list = await fs.readFile(contactsPath, 'utf8');
    const result = JSON.parse(list);
    // console.table(result);
    return result;
};

const listContacts = async () => {
    try {
        // const list = await fs.readFile("__dirname/contacts", "utf8"); // ! как то так?
        // const list = await fs.readFile(contactsPath, 'utf8');
        // const result = JSON.parse(list.toString());
        const result = await readList();

        // console.table(result);
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

const getContactById = async (contactId) => {
    try {
        // const list = await fs.readFile(contactsPath, 'utf8');
        // const result = JSON.parse(list.toString());
        const result = await readList();

        const itemList = result.find(
            (contact) => contact.id === Number(contactId)
        );
        return itemList;
    } catch (error) {
        console.log(error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        // const list = await fs.readFile(contactsPath, 'utf8');
        // const result = JSON.parse(list.toString());
        const result = await readList();

        const filteredContacts = result.filter(
            (contact) => contact.id != contactId
        );

        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

        return filteredContacts; // ! если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
    } catch (error) {
        console.log(error.message);
    }
};

const addContact = async (body) => {
    const validData = await contactSchema.isValid(body);

    if (!validData) {
        const notValid = {
            message:
                'required fields are not correct type or missing, check them, please',
        };
        return notValid;
    } else {
        try {
            // const list = await fs.readFile(contactsPath, 'utf8');
            // const result = JSON.parse(list.toString());
            const result = await readList();

            const lastId = result[result.length - 1].id;

            const addedContact = [...result, { id: lastId + 1, ...body }];

            await fs.writeFile(contactsPath, JSON.stringify(addedContact));

            return addedContact;
        } catch (error) {
            console.log(eror.message);
        }
    }
};

const updateContact = async (contactId, body) => {
    const validData = await contactSchema.isValid(body);

    if (!validData) {
        const notValid = {
            message:
                'required fields are not correct type or missing, check them, please',
        };
        return notValid;
    } else {
        try {
            // const list = await fs.readFile(contactsPath, 'utf8');
            // const result = JSON.parse(list.toString());
            const result = await readList();

            // const oneContactToUpdate = result.find(
            //     (item) => item.id == contactId
            // );
            // const updatedContact = { ...oneContactToUpdate, ...body };
            // const filteredResult = result.filter(
            //     (contact) => contact.id != contactId
            // );
            // const updatedList = [...filteredResult, updatedContact];

            // -----------------------------------
            const updatedList = result.map((contact) => {
                if (contact.id == contactId) {
                    return { ...contact, ...body };
                } else {
                    return contact;
                }
            });

            await fs.writeFile(contactsPath, JSON.stringify(updatedList));

            return updatedList;
        } catch (error) {
            console.log(error.message);
        }
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
