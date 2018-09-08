const xss = require('xss');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = mongoose.model('User');

// create a new user
exports.signup = async (ctx, next) => {
  function validateFormat(user) {
    const validations = {
      name: {
        rule: 'Name is required',
        validate: function() {
          const name = _.get(user, 'name', '');
          return (name && name.length > 0) ? true : false;
        }
      },
      email: {
        rule: 'Email should be valid',
        validate: function () {
          const email = _.get(user, 'email', '');
          const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(email);
        }
      },
      password: {
        rule: 'Password is required and should not be less than 6 characters',
        validate: function () {
          const password = _.get(user, 'password', '');
          return (password && password.length > 5) ? true : false;
        }    
      }
    };
    const errors = [];
    _.each(validations, r => {
      const isValid = r.validate();
      if (!isValid) {
        errors.push(r.rule);
      }
    });
    if (errors.length > 0) {
      const errMsg = _.join(errors, ',');
      return { valid: false, msg: errMsg };
    }
    return { valid: true, msg: 'valid.' };
  }

  const body = ctx.request.body;

  // 检查格式
  const result = validateFormat(body);
  if (!result.valid) {
    ctx.body = {
      success: false,
      msg: result.msg
    };
    return;
  }

  // 检查是否存在
  const user = await User.findOne({ email: xss(body.email) }).exec();
  if (user) {
    ctx.body = {
      success: false,
      msg: 'email already existed.'
    };
    return;
  }

  // 通过检查
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(body.password, salt);

  let obj = new User({
    name: _.toString(_.get(body, 'name', '')),
    email: _.toString(_.get(body, 'email', '')),
    password: _.toString(_.get(body, 'password', '')),
  });

  try {
    obj = await obj.save();
  } catch(e) {
    ctx.body = {
      success: false,
      msg: 'Something\'s wrong with the server.'
    };
    console.log(e);
    return;
  }

  let u = { ...obj._doc };
  _.unset(u, 'password');
  ctx.body = {
    success: true,
    user: u
  };

  return next();
};