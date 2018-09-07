const Router = require('koa-router');
const Live = require('../app/controllers/live');

module.exports = function() {
  const router = new Router({
    prefix: '/api'
  });

  /**
 * @method: POST
 * @endpoint /api/on-live-auth
 * @description authentication for live streaming user
 */
  router.post('/on-live-auth', Live.onLiveAuth);

  /**
 * @method: POST
 * @endpoint /api/on-live-done
 * @description Event after user finishing streaming.
 */
  router.post('/on-live-done', Live.onLiveDone);

  return router;
};
