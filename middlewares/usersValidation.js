const Joi = require('joi');

const schemaCreateUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validate = (schema, obj, res, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message, type, path }] = error.details;

    if (type === 'object.unknown') {
      return res.status(400).json({
        message,
      });
    }

    if (type === 'object.missing') {
      return res.status(400).json({
        message: 'missing fields',
      });
    }

    return res.status(400).json({
      message: `missing required ${path} field`,
    });
  }
  next();
};

const validateCreateUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, res, next);
};

const validateLoginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, res, next);
};

const validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      data: 'Bad request',
      message: 'Avatar field with file not found',
    });
  }
  next();
};

module.exports = {
  validateCreateUser,
  validateLoginUser,
  validateUploadAvatar,
};
