const jwt = require('jsonwebtoken');

exports.hasBody = async (ctx, next) => {
  const body = ctx.request.body || {};

  if (Object.keys(body).length === 0) {
    ctx.body = {
      success: false,
      err: '是不是漏掉什么了'
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
      msg: `eyyy, seems you lost the key.`
    };
    return;
  }

  try {
    const decoded = await jwt.verify(token, 'donottellothers');
    console.log('decoded token', decoded);
    if (!decoded) {
      ctx.body = {
        success: false,
        err: 'Whoops, your login session has expired'
      }
      return;
    }
    // token通过
    const email = decoded.email;
    ctx.userEmail = email;
    return next();
  } catch(e) {
    ctx.body = {
      success: false,
      err: 'Whoops, wrong token'
    }
    console.log('catch', e);
    return;
  }
};