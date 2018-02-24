/**
 * api
 */

const router = require('koa-router')();
const user = require('./userRouter');

router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;
