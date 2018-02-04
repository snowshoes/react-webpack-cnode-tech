// const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const {
  entry, output, template
} = require('./webpack.config.paths');

// const PATHS = {
//   entry: path.join(__dirname, '../client/app.js'),
//   output: path.join(__dirname, '../dist'),
//   modules: path.join(__dirname, '../node_modules'),
//   template: path.join(__dirname, '../client/template.html')
// };

// curiosity: Can we use import { PATHS } from './webpack.config.base.js' ?
// https://stackoverflow.com/questions/31903692/how-can-i-use-es6-in-webpack-config-js

const isDev = process.env.NODE_ENV === 'development';
const config = merge(baseConfig, {
  entry: {
    app: entry
  },
  output: {
    // [] means variable in webpack
    filename: '[name].[hash].js',
    path: output,
    publicPath: '/public/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template
    }),
    // always expose NODE_ENV to webpack, in order to use
    // `process.env.NODE_ENV` inside your code for environment check
    // Uglify will automatically drop any unreachable code
    new webpack.DefinePlugin({
      'process.ent': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        TWO: 1 + 1,
        SOME_BOOLEAN: true
      }
    }),
    new webpack.NamedModulesPlugin()
  ]
});

// only applied for dev
if (isDev) {
  config.entry = {
    app: ['react-hot-loader/patch', entry]
  };
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: output,
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333'
    }
  };

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
