const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    // to refer to a file that has been created by webpack
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      // name is not mendatory in the container but recommended
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
        // auth: 'auto@http://localhost:8081/remoteEntry.js'
      },
      shared: packageJson.dependencies
    }),
  ]
};

module.exports = merge(commonConfig, prodConfig)