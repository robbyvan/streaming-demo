const xss = require('xss');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const { validateRegisterFormat, validateLoginFormat } = require('../validations/user');


// create a new user
exports.signup = async (ctx, next) => {
  const body = ctx.request.body;

  // 检查格式
  const result = validateRegisterFormat(body);
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
    name: body.name,
    email: body.email,
    password: hash
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

// login
exports.login = async (ctx, next) => {
  const body = ctx.request.body;

  // 检查格式
  const result = validateLoginFormat(body);
  if (!result.valid) {
    ctx.body = {
      success: false,
      msg: result.msg
    };
    return;
  }

  // 检查是否存在
  const user = await User.findOne({ email: xss(body.email) }).exec();
  if (!user) {
    ctx.body = {
      success: false,
      msg: "Whoops, seems you haven't registered yet."
    };
    return;
  }

  // 检查密码
  const passwordMatched = await bcrypt.compare(body.password, user.password);
  if (!passwordMatched) {
    ctx.body = {
      success: false,
      msg: 'Umm, seems the password is wrong.'
    };
    return;
  }

  let u = {...user._doc};
  _.unset(u, 'password');
  // 生成jwt
  const token = jwt.sign({ email: u.email }, 'donottellothers', { expiresIn: '1h' });
  ctx.body = {
    success: true,
    msg: 'login success.',
    user: u,
    token: token
  };
  return next();
};

// get user info
exports.me = async (ctx, next) => {
  const userEmail = ctx.userEmail;
  console.log('userEmail', userEmail);
  try {
    const user = await User.findOne({ email: userEmail }).exec();
    const u = { ...user._doc };
    _.unset(u, 'password');
    ctx.body = {
      success: true,
      user: u,
    };
    return next();
  } catch(e) {
    ctx.body = {
      success: false,
      msg: 'Whoops, can not get user information now.'
    };
    return;
  }
}