const dbConnect = require('./db_connect');
const serverStart = require('./server_start');
const middlewaresLoad = require('./middlewares_load');

module.exports = {
  dbConnect,
  serverStart,
  middlewaresLoad,
};
