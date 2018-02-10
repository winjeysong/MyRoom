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

const app = new Koa();

// -------- MIDDLEWARES CONFIG --------
// log
app.use(convert(logger()));

// parse body
app.use(bodyParser());

// load static sources
app.use(convert(staticSources(path.join(__dirname, './public'))));


// -------- DB CONFIG --------
mongoose.Promise = global.Promise;
mongoose.connect(config.db_url);

// -------- INIT Routes --------
// ...

// -------- START SERVER --------
app.listen(config.server_port);
console.log(`server is listening on ${config.server_port}`);
