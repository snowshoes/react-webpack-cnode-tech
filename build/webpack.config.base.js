// const path = require('path');

// const PATHS = {
//   entry: path.join(__dirname, '../client/app.js'),
//   output: path.join(__dirname, '../dist'),
//   modules: path.join(__dirname, '../node_modules'),
//   template: path.join(__dirname, '../client/template.html')
// };

const { modules } = require('./webpack.config.paths');

module.exports = {
  module: {
    // eslint jsx? code before transpile
    rules: [
      {
        enforce: 'pre',
        test: /.jsx?$/,
        loader: 'eslint-loader',
        exclude: modules
      },
      {
        test: /.jsx?$/,
        use: 'babel-loader',
        exclude: modules
      }
    ]
  }
};

// firstly i tried export a vairable but it doesn't work
// uncomment all comments to see errors
// module.exports.PATHS = PATHS;
// An introduction to module.exports and export variable
// http://stackabuse.com/how-to-use-module-exports-in-node-js/
