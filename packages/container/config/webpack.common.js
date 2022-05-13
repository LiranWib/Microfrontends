const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  module: {
    rules: [
      {
        // "test" tells babel to load every file that in the specified pattern
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}