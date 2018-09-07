const _ = require('lodash');

/**
 * @method: POST
 * @endpoint /api/on-live-auth
 * @description authentication for live streaming user
 */
exports.onLiveAuth = async ctx => {
  const streamInfo = ctx.request.body;
  const streamSecretKey = _.get(streamInfo, 'name');

  // we can check stream key to verify it at backend.
  console.log(`User "${streamSecretKey}" starts streaming.`);

  // Users are allowed to stream their video when secret streaming key is verified.
  ctx.body = {
    verified: true
  };
  
};


exports.onLiveDone = async ctx => {
  const streamingKey = _.get(ctx.request.body, 'name');
  console.log(`User "${streamingKey}"" finished streaming.`);

  // http response will not effect our streaming server.
  ctx.body = {
    done: true
  };
};