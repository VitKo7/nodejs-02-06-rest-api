const fs = require("fs").promises;
const path = require("path");
const contactSchema = require("./contactSchema");

// const contacts = require("./contacts.json"); // ! и как его использовать?

const contactsPath = path.join(__dirname, "contacts.json");

// const readList = () => {
//   const list = fs.readFile(contactsPath, "utf8");
//   const result = JSON.parse(list.toString());
//   // console.table(result);
//   return result;
// };

const listContacts = async () => {
  try {
    // const list = await fs.readFile("__dirname/contacts", "utf8"); // ! как то так?
    // await readList(); // ! not working...(((*)))
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
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(list.toString());

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
        "required fields are not correct type or missing, check them, please",
    };
    return notValid;
  } else {
    try {
      const list = await fs.readFile(contactsPath, "utf8");
      const result = JSON.parse(list.toString());

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
        "required fields are not correct type or missing, check them, please",
    };
    return notValid;
  } else {
    try {
      const list = await fs.readFile(contactsPath, "utf8");
      const result = JSON.parse(list.toString());

      const oneContactToUpdate = result.find((item) => item.id == contactId);
      console.log(oneContactToUpdate);
      const updatedContact = { ...oneContactToUpdate, ...body };
      console.log(updatedContact);

      // const index = oneContactToUpdate.id;

      // const updatedList = [
      //   ...result.slice(0, index),
      //   ...updatedContact,
      //   ...result.slice(index + 1),
      // ];
      const updatedList = [...result, ...updatedContact];
      console.log(updatedList); // ! (((*)))
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
