/**
 * middlewares config
 */

const path = require('path');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-logger');
const koaJwt = require('koa-jwt');
const { jwt_secret, build_path } = require('./config');

const env = process.env.NODE_ENV;

module.exports = (app) => {
  // log
  app.use(convert(logger()));

  // parse body
  app.use(bodyParser());

  // jwt
  app.use(koaJwt({ secret: jwt_secret, key: 'jwtdata' }).unless({
    path: [/^\/api\/user\/user-login/, /^\/api\/user\/user-register/, /^\/login/, /^\/register/, /^\//],
  }));

  if (env === 'production') {
    // load static sources
    app.use(convert(serve(path.resolve(build_path))));
  }
};
