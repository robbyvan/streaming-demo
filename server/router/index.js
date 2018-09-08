const Router = require('koa-router');
const App = require('../app/controllers/app');
const Live = require('../app/controllers/live');
const User = require('../app/controllers/user');

module.exports = function(app) {
  const router = new Router({
    prefix: '/api'
  });

  /**
  * @method: POST
  * @endpoint: /api/on-live-auth
  * @description: authentication for live streaming user
  */
  router.post('/on-live-auth', Live.onLiveAuth);

  /**
  * @method: POST
  * @endpoint: /api/on-live-done
  * @description: Event after user finishing streaming.
  */
  router.post('/on-live-done', Live.onLiveDone);

  /**
  * @method: POST
  * @endpoint: /api/camera/:id/stream
  * @description: Send command to server with camera ID and stream or stop stream.
  */
  router.post('/camera/:id/stream', Live.command(app));

  /*** @method: POST
  * @endpoint: /api/users/signup
  * @description: Create new user.
  */
  router.post('/users/signup', App.hasBody, User.signup);

  /*** @method: POST
  * @endpoint: /api/users/login
  * @description: Create new user.
  */
  router.post('/users/login', App.hasBody, User.login);

  return router;
};
