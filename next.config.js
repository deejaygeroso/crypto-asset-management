const webpack = require('webpack');

module.exports = {
  // webpack: (config, { dev }) => {
  webpack: (config) => {

    config.plugins.push(
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery: 'jquery'
      })
    );

    return config
  }
}