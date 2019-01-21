const ValidatorClass = require("fastest-validator");
const Validator = new ValidatorClass();

/**
 * Check if the given parameter meets the specified schema
 * @param {*} body 
 * @param {*} schema 
 */
function validate(body, schema) {
  const result = Validator.validate(body, schema);
  if (result === true) {
    return {
      success: true,
      message: "success"
    }
  } else {
    return {
      success: false,
      message: result[0].message
    }
  }
}

module.exports = {
  validate
}