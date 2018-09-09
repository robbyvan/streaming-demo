const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.hasBody = async (ctx, next) => {
  const body = ctx.request.body || {};

  if (Object.keys(body).length === 0) {
    ctx.body = {
      success: false,
      msg: '是不是漏掉什么了'
    };
    return;
  }
  ctx.body = {
    ...ctx.body,
    bodycheck: 'yep, you got body'
  };
  return next();
};

exports.hasToken = async (ctx, next) => {
  let token = ctx.request.query.rbtoken;
  if (!token) {
    token = ctx.request.headers['rbtoken'];  
  }

  if (!token) {
    ctx.body = {
      success: false,
      msg: `eyyy, seems you lost the key.`,
      code: -1,
    };
    return;
  }

  try {
    const decoded = await jwt.verify(token, 'donottellothers');
    if (!decoded) {
      ctx.body = {
        success: false,
        msg: 'Whoops, your login session has expired',
        code: -1,
      }
      return;
    }

    // token通过
    const email = decoded.email;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      ctx.body = {
        success: false,
        msg: 'Hello there, but who are you?'
      };
      return;
    }

    ctx.user = user;
    return next();
  } catch(e) {
    ctx.body = {
      success: false,
      msg: 'Whoops, seems your session has expired',
      code: -1
    }
    console.log('error: ', e.message);
    return;
  }
};