/**
 * This file: use middlewares, connect mongodb, start server
 */

const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const logger = require('koa-logger');
const mongoose = require('mongoose');

const config = require('./config/config');
const routers = require('./routes/index');

const app = new Koa();
const style = config.log_style;

// -------- MIDDLEWARES CONFIG --------
// log
app.use(convert(logger()));

// parse body
app.use(bodyParser());

// load static sources
app.use(convert(serve(path.join(__dirname, config.build_path))));

// -------- DB CONFIG --------
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url);
// connect mongodb successfully
mongoose.connection.on('connected', () => {
  console.log(style.info(`${style.success('[SUCCESS]')} MongoDB has connected to ${style.em(config.db_url)}.`));
});
// fail to connect
mongoose.connection.on('error', (err) => {
  console.log(`${style.error('[ERROR] Failed to connect MongoDB')}.\n${err}`);
});
// disconnect
mongoose.connection.on('disconnected', () => {
  console.log(style.warn('[WARN] MongoDB has disconnected.'));
});

// -------- INIT Routes --------
app.use(routers.routes()).use(routers.allowedMethods());

// -------- START SERVER --------
app.listen(config.server_port);
console.log(style.info(`${style.success('[SUCCESS]')} Server is listening on ${style.em(config.server_port)}.`));

