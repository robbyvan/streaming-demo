const _ = require('lodash');

const validations = {
   name: {
    rule: 'Name is required',
    validate: function(cam) {
      const name = _.get(cam, 'name', '');
      return (name && name.length > 0) ? true : false;
    }
  },
  public: {
    rule: 'Public should be a boolean',
    validate: function(cam) {
      const pub = _.get(cam, 'public', '');
      if (typeof pub === 'boolean') {
        return true;
      }
      return false;
    }
  }
};

function validateCreateCamera(cam) {
  const errors = [];
  const rules = ['name', 'public'];
  rules.map(r => {
    const isValid = validations[r].validate(cam);
    if (!isValid) {
      errors.push(validations[r].rule);
    }
  });
  if (errors.length > 0) {
    const errMsg = _.join(errors, ';');
    return { valid: false, msg: errMsg };
  }
  return { valid: true, msg: 'valid.' };
}

module.exports = {
  validateCreateCamera
};
