/**
 * api/post
 */

const router = require('koa-router')();
const userOperation = require('../../controller/index');

const routers = router
  .post('/add', userOperation.postSave)
  .post('/search/:id', userOperation.postsGet)
  .post('/show/:postid', userOperation.postShow)
  .post('/update/:postid', userOperation.postUpdate);

module.exports = routers;
