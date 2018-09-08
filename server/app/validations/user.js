const _ = require('lodash');

const validations = {
  name: {
    rule: 'Name is required',
    validate: function(user) {
      const name = _.get(user, 'name', '');
      return (name && name.length > 0) ? true : false;
    }
  },
  email: {
    rule: 'Email should be valid',
    validate: function (user) {
      const email = _.get(user, 'email', '');
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    }
  },
  password: {
    rule: 'Password is required and should not be less than 6 characters',
    validate: function (user) {
      const password = _.get(user, 'password', '');
      return (password && password.length > 5) ? true : false;
    }    
  }
};

// check register
function validateRegisterFormat(user) {
  const errors = [];
  const rules = ['name', 'email', 'password'];
  rules.map(r => {
    const isValid = validations[r].validate(user);
    if (!isValid) {
      errors.push(validations[r].rule);
    }
  });
  if (errors.length > 0) {
    const errMsg = _.join(errors, ',');
    return { valid: false, msg: errMsg };
  }
  return { valid: true, msg: 'valid.' };
}

// check login
function validateLoginFormat(user) {
  const errors = [];
  const rules = ['email', 'password'];
  rules.map(r => {
    const isValid = validations[r].validate(user);
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
  validateRegisterFormat,
  validateLoginFormat,
};