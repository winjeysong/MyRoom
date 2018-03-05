/**
 * api
 */

const router = require('koa-router')();
const user = require('./userRouter');
const post = require('./postRouter');

router.use('/user', user.routes(), user.allowedMethods())
      .use('/post', post.routes(), post.allowedMethods());

module.exports = router;
