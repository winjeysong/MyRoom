/**
 * api/post
 */

const router = require('koa-router')();
const userOperation = require('../../controller/index');

const routers = router
  .post('/', userOperation.postSave);

module.exports = routers;
