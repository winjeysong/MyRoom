/**
 * config
 */

const chalk = require('chalk');

module.exports = {
  db_url: 'mongodb://localhost:27017/logindemo',
  server_port: 3333,
  dev: {
    db_url: 'mongodb://localhost:27017/logindemo-dev',
    server_port: 3334,
  },
  build_path: './dist',
  build_filename: 't',
  log_style: {
    error: chalk.bold.hex('#EE4000'),
    warn: chalk.hex('#EEC900'),
    success: chalk.hex('#98FB98'),
    info: chalk.hex('#EEEEEE'),
    em: chalk.hex('#57CBFA'),
  },
};
