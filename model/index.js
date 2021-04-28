const fs = require("fs").promises;
const path = require("path");

// const contacts = require("./contacts.json"); // ! и как его использовать?

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    // const list = await fs.readFile("__dirname/contacts", "utf8"); // ! как то так?
    const list = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(list.toString());
    // console.table(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(list.toString());
    const itemList = result.find((contact) => contact.id === Number(contactId));
    return itemList;
  } catch (error) {
    console.log(eroor.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(list.toString());

    const filteredContacts = result.filter(
      (contact) => contact.id != contactId
    );

    const dataNew = JSON.stringify(filteredContacts, null, "\t");
    await fs.writeFile(contactsPath, dataNew);

    const listNew = await fs.readFile(contactsPath, "utf8");
    const resultNew = JSON.parse(listNew.toString());

    return resultNew;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
