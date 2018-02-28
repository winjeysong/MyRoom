const config = require('./config');

const style = config.log_style;
const env = process.env.NODE_ENV;
const serverPortControl = (app, mode, serverPort) => {
  app.listen(serverPort);
  console.log(style.info(`${style.success('[SUCCESS]')} ${mode}Server is listening on ${style.em(serverPort)}.`));
};

module.exports = (app) => {
  if (env === 'production') {
    serverPortControl(app, '', config.server_port);
  } else if (env === 'development') {
    serverPortControl(app, 'dev', config.dev.server_port);
  }
};

