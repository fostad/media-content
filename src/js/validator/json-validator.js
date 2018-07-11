const Validator = require('jsonschema').Validator;
let v;

const createValidator = () => {
  v = new Validator();
};

const isJsonValid = (content, schema) => {
  console.log('validating json');
  const result = v.validate(content, schema);
  console.log("validation errors", result.errors);
  return (result.errors.length == 0) ? true : false;
};

module.exports = {
  createValidator,
  isJsonValid
};
