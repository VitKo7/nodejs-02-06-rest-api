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
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
