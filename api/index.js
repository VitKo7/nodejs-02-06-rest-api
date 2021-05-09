const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controller/index');

router.get('/', ctrlContacts.get);

router.get('/:contactId', ctrlContacts.getById);

router.post('/', ctrlContacts.create);

router.patch('/:contactId', ctrlContacts.update);

router.patch('/:contactId', ctrlContacts.updateStatus);

router.delete('/:contactId', ctrlContacts.remove);

module.exports = router;
