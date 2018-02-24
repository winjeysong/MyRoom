/**
 * This file: use middlewares, connect mongodb, start server
 */

const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const staticSources = require('koa-static');
const logger = require('koa-logger');
const mongoose = require('mongoose');

const config = require('./config/config');
const routers = require('./routes/index');

const app = new Koa();

// -------- MIDDLEWARES CONFIG --------
// log
app.use(convert(logger()));

// parse body
app.use(bodyParser());

// load static sources
app.use(convert(staticSources(path.join(__dirname, './dist'))));


// -------- DB CONFIG --------
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url);
// connect mongodb successfully
mongoose.connection.on('connected', () => {
  console.log(`mongodb has connected to ${config.db_url}`);
});
// fail to connect
mongoose.connection.on('error', (err) => {
  console.log(`failed to connect mongodb\n${err}`);
});
// disconnect
mongoose.connection.on('disconnected', () => {
  console.log('mongodb has disconnected');
});

// -------- INIT Routes --------
app.use(routers.routes()).use(routers.allowedMethods());

// -------- START SERVER --------
app.listen(config.server_port);
console.log(`server is listening on ${config.server_port}`);
