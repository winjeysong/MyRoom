/**
 * router index
 */

const router = require('koa-router')();
const api = require('./api/index');

router.use('/api', api.routes(), api.allowedMethods());

module.exports = router;
