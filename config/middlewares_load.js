/**
 * middlewares config
 */

const path = require('path');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-logger');
const config = require('./config');

const env = process.env.NODE_ENV;

module.exports = (app) => {
  // log
  app.use(convert(logger()));

  // parse body
  app.use(bodyParser());

  if (env === 'production') {
    // load static sources
    app.use(convert(serve(path.resolve(config.build_path))));
  }
};
