const express = require("express");
const router = express.Router();
const contacts = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    return res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    return res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
