/**
 * koa server
 * use middlewares, connect mongodb with mongoose, start server
 */

const Koa = require('koa');
const routers = require('./routes/index');
const { middlewaresLoad: middlewares, dbConnect: db, serverStart: server } = require('./config/tool');

const app = new Koa();

// -------- MIDDLEWARES CONFIG --------
middlewares(app);

// -------- DB CONFIG --------
db();

// -------- INIT Routes --------
app.use(routers.routes()).use(routers.allowedMethods());

// -------- START SERVER --------
server(app);
