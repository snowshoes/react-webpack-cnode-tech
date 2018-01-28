const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');

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
        test: /.jsx?$/,
        use: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  }
};
