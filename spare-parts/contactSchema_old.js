const { object, string, number, date } = require("yup");

const contactSchema = object({
  name: string().required("Обов`язкове поле"),
  // age: number().required().positive().integer(),
  email: string().required("Обов`язкове поле").email(),
  // website: string().url(),
  // createdOn: date().default(() => new Date()),
  phone: string().required("Обов`язкове поле"),
});

module.exports = contactSchema;
