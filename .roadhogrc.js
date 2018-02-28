const { dev } = require('./config/config');

module.exports = {
  "entry": "./src/index.js",
  "autoprefixer": {
    "browsers": [
      ">1%",
      "ie>=8"
    ]
  },
  "hash": true,
  "theme": "./src/theme.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ],
      "proxy": {
        "/api": `http://localhost:${dev.server_port}/`,
        "changeOrigin": true,
        "pathRewrite": { "^/api": ""}
      }
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  },
}
