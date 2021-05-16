const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controller/ctrlContacts');
const {
  validateCreate,
  validateUpdate,
} = require('../validation/contactsValidation');
const guard = require('../middlewares/guard');

router
  .get('/', guard, ctrlContacts.get)
  .get('/:contactId', guard, ctrlContacts.getById)
  .post('/', guard, validateCreate, ctrlContacts.create)
  .put('/:contactId', guard, validateUpdate, ctrlContacts.update)
  .patch('/:contactId', guard, validateUpdate, ctrlContacts.updateStatus)
  .delete('/:contactId', guard, ctrlContacts.remove);

// router.patch('/:contactId/favorite', ctrlContacts.updateStatus);

module.exports = router;
