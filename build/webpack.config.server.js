const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
// const HTMLWebpackPlugin = require('html-webpack-plugin');

// const PATHS = {
//   entry: path.join(__dirname, '../client/app.js'),
//   output: path.join(__dirname, '../dist'),
//   modules: path.join(__dirname, '../node_modules'),
//   template: path.join(__dirname, '../client/template.html')
// };

const config = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    // [] means variable in webpack
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2'
  }
});

module.exports = config;
