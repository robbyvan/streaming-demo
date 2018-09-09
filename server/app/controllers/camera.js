const _ = require('lodash');
const xss = require('xss');
const mongoose = require('mongoose');
const Camera = mongoose.model('Camera');
const { validateCreateCamera } = require('../validations/camera');

exports.create = async (ctx, next) => {
  const body = ctx.request.body;

  // 检查格式
  const result = validateCreateCamera(body);
  if (!result.valid) {
    ctx.body = {
      success: false,
      msg: result.msg
    };
    return;
  }

  // 检查是否存在
  const camera = await Camera.findOne({ name: xss(body.name) }).exec();
  if (camera) {
    ctx.body = {
      success: false,
      msg: 'camera name already existed.'
    };
    return;
  }

  // 通过检查
  let obj = new Camera({
    name: body.name,
    public: body.public,
    userId: ctx.user._id
  });

  console.log(obj);

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

  let c = { ...obj._doc };

  ctx.body = {
    success: true,
    cam: c
  };
  return next();
};

exports.getMyCameralist = async (ctx, next) => {
  const user = ctx.user;
  try {
    const cameraList = await Camera.find({ userId: user._id }).exec();
    ctx.body = {
      success: true,
      cameraList: cameraList.map(item => {
        let i = item._doc;
        _.unset(i, 'meta');
        _.unset(i, '__v');
        _.unset(i, 'userId');
        return i;
      }),
    };
  } catch(e) {
    console.log(e);
    ctx.body = {
      success: false,
      cameraList: [],
      msg: 'Can not find cameras'
    };
    return;
  }
  return next();
};