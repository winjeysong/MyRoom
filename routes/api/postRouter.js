/**
 * api/post
 */

const router = require('koa-router')();
const userOperation = require('../../controller/index');

const routers = router
  .post('/add', userOperation.postSave)
  .post('/search/:id', userOperation.postGet);

module.exports = routers;
