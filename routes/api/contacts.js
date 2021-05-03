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
    console.error(e.message);
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      res.json({
        status: "error",
        code: 404,
        message: "Such ID not found",
      });
    } else {
      return res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    }
  } catch (e) {
    console.error(e.message);
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
    console.error(e.message);
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.json({
        status: "error",
        code: 400,
        message: "Missing required field",
      });
    } else {
      const result = await contacts.addContact(req.body);
      return res.json({
        status: "success",
        code: 201,
        data: {
          result,
        },
      });
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    if (!contactId) {
      res.json({
        status: "error",
        code: 404,
        message: "Such ID not found",
      });
    } else if (!name || !email || !phone) {
      return res.json({
        status: "error",
        code: 400,
        message: "Missing required field",
      });
    } else {
      const result = await contacts.updateContact(contactId, req.body);

      return res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    }
  } catch (e) {
    console.error(e.message);
    next(e);
  }
});

module.exports = router;
