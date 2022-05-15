const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      // remoteEntry will tell another program how to load our projects files
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap'
      },
      /** if we want to be specific about the packages we want to share (maybe we want 
      a different patch and minor version of a package) we should use an array we a specific selection */
      // shared: ['react', 'react-dom']
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};

// the second argument will take priority over the first
module.exports = merge(commonConfig, devConfig)