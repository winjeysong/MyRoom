/**
 * api/user
 */

const router = require('koa-router')();
const userOperation = require('../../controller/index');

const routers = router
  .post('/user-register', userOperation.userRegister)
  .post('/user-login', userOperation.userLogin)
  .post('/id/:id', userOperation.userDisplay);

module.exports = routers;
