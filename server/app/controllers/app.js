exports.hasBody = async (ctx, next) => {
  const body = ctx.request.body || {};

  if (Object.keys(body).length === 0) {
    ctx.body = {
      success: false,
      err: '是不是漏掉什么了'
    };
    return;
  }
  return next();
};