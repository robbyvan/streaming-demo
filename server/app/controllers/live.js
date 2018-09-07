const _ = require('lodash');

// 开始推流
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

// 结束推流
exports.onLiveDone = async ctx => {
  const streamingKey = _.get(ctx.request.body, 'name');
  console.log(`User "${streamingKey}"" finished streaming.`);

  // http response will not effect our streaming server.
  ctx.body = {
    done: true
  };
};

// web client通过server控制raspberry pi
exports.command = app => async ctx => {
  // start or stop pushing stream to raspberry according to the action from user.
  const streamCommand = _.get(ctx.request.body, 'stream', false);

  const connections = app.connections.getClient();

  // loop through each pi socket client and seng the command to them.
  connections.map(con => {
    const ws = con.ws;
    if (ws) {
      const message = {
        action: 'stream',
        payload: streamCommand
      };
      ws.send(JSON.stringify(message));
    }
  });

  ctx.body = {
    received: true
  };
};