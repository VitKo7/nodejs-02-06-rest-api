const Contact = require('../schemas/contact');

const getAllContacts = async () => {
  const total = await Contact.find().countDocuments();
  let _contacts = await Contact.find();

  return { total, contacts: _contacts };
};

const getContactById = async id => {
  return Contact.findById(id);
};

const addContact = async fields => {
  return Contact.create(fields);
};

const updateContact = async (
  contactId,
  { name, email, phone, favorite, age, experience, children, owner },
) => {
  const updateFields = {
    ...(name ? { name } : {}),
    ...(email ? { email } : {}),
    ...(phone ? { phone } : {}),
    ...(favorite ? { favorite } : {}),
    ...(age ? { age } : {}),
    ...(experience ? { experience } : {}),
    ...(children ? { children } : {}),
    ...(owner ? { owner } : {}),
  };

  return Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...updateFields },
    { new: true },
  );
};

const removeContact = async id => {
  return Contact.findByIdAndRemove(id);
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
