const Router = require('koa-router');
const App = require('../app/controllers/app');
const Live = require('../app/controllers/live');
const User = require('../app/controllers/user');
const Camera = require('../app/controllers/camera');

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

  /** 
  * @method: POST
  * @endpoint: /api/users/signup
  * @description: Create new user.
  */
  router.post('/users/signup', App.hasBody, User.signup);

  /** 
  * @method: POST
  * @endpoint: /api/users/signup
  * @description: Create new user.
  */
  router.post('/users/login', App.hasBody, User.login);

  /** 
  * @method: GET
  * @endpoint: /api/users/me
  * @description: Get User Info By Token.
  */
  router.get('/users/me', App.hasToken, User.me);

  /** 
  * @method: POST
  * @endpoint: /api/cameras
  * @description: Create new camera under certain userId.
  */
  router.post('/cameras', App.hasBody, App.hasToken, Camera.create);

  /** 
  * @method: GET
  * @endpoint: /api/cameras/:id
  * @description: Get camera list.
  */
  router.get('/cameras', App.hasToken, Camera.getMyCameralist);

  return router;
};
