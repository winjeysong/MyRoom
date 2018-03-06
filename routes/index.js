/**
 * router index
 */

const router = require('koa-router')();
const api = require('./api/index');
const fs = require('fs');
const path = require('path');
const { build_filename, build_path } = require('../config/config');

const filePath = `${path.join(build_path, build_filename)}.html`;
const readFile = new Promise((resolve, reject) => {
  fs.readFile(path.resolve(filePath), (err, data) => {
    if (!err) {
      resolve(data);
    } else {
      reject(err);
    }
  });
});

router
  // fix the issue:
  // front-end router with browserHistory
  // forward to the right page with Link (react-router)
  // it will be 404NotFound after refresh the page
  .get('/*', async (ctx) => {
    const html = await readFile;
    ctx.type = 'html';
    ctx.body = html;
  })
  .use('/api', api.routes(), api.allowedMethods());

module.exports = router;
