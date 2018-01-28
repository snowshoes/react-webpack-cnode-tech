const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  entry: path.join(__dirname, '../client/app.js'),
  output: path.join(__dirname, '../dist'),
  modules: path.join(__dirname, '../node_modules'),
  template: path.join(__dirname, '../client/template.html')
};

module.exports = {
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
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.jsx?$/,
        loader: 'eslint-loader',
        exclude: [PATHS.modules]
      },
      {
        test: /.jsx?$/,
        use: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  }
};
