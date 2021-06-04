const Joi = require('joi');

const schemaCreate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
  age: Joi.number().required(),
  experience: Joi.number().required(),
  children: Joi.boolean().optional(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
  age: Joi.number().optional(),
  experience: Joi.number().optional(),
  children: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favorite', 'age', 'experience', 'children');

const validateCreate = (req, res, next) => {
  const { error } = schemaCreate.validate(req.body);

  if (error) {
    const [{ message, type, path }] = error.details;

    if (type === 'object.unknown') {
      return res.status(400).json({
        message,
      });
    }
    return res.status(400).json({
      message: `missing required ${path} field`,
    });
  }
  next();
};

const validateUpdate = (req, res, next) => {
  const { error } = schemaUpdate.validate(req.body);

  if (error) {
    const [{ message, type }] = error.details;

    if (type === 'object.missing') {
      return res.status(400).json({
        message: 'missing fields',
      });
    }
    return res.status(400).json({
      message,
    });
  }
  next();
};

module.exports = {
  validateCreate,
  validateUpdate,
};
