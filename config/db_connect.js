/**
 * db config
 */

const mongoose = require('mongoose');
const config = require('./config');

const style = config.log_style;
const env = process.env.NODE_ENV;
const dbUrlControl = (dbUrl) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(dbUrl);
  // connect mongodb successfully
  mongoose.connection.on('connected', () => {
    console.log(style.info(`${style.success('[SUCCESS]')} MongoDB has connected to ${style.em(dbUrl)}.`));
  });
  // fail to connect
  mongoose.connection.on('error', (err) => {
    console.log(`${style.error('[ERROR] Failed to connect MongoDB')}.\n${err}`);
  });
  // disconnect
  mongoose.connection.on('disconnected', () => {
    console.log(style.warn('[WARN] MongoDB has disconnected.'));
  });
};

module.exports = () => {
  if (env === 'production') {
    dbUrlControl(config.db_url);
  } else if (env === 'development') {
    dbUrlControl(config.dev.db_url);
  }
};

