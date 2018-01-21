const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  entry: path.join(__dirname, '../client/app.js'),
  output: path.join(__dirname, '../dist'),
  modules: path.join(__dirname, '../node_modules'),
  template: path.join(__dirname, '../client/template.html')
};

const isDev = process.env.NODE_ENV === 'development';
const config = {
  entry: {
    app: PATHS.entry
  },
  output: {
    //[] means variable in webpack
    filename: '[name].[hash].js',
    path: PATHS.output,
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: 'babel-loader',
        exclude: [PATHS.modules]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: PATHS.template
    })
  ]
};

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: PATHS.output,
    // hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    }
  };
}

module.exports = config;
