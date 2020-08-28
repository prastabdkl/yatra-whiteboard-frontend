process.env.NODE_ENV = 'development'
var reactScriptsConfig = require('react-scripts/config/webpack.config.js')
module.exports = Object.assign({}, reactScriptsConfig, {
  plugins: reactScriptsConfig.plugins.filter((plugin, index) => index !== 3),
  entry: reactScriptsConfig.entry.filter(entry => !entry.includes('react-dev-utils/webpackHotDevClient.js'))
})
