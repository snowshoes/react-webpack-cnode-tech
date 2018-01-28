const path = require('path');
const webpack = require('webpack');
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
    // [] means variable in webpack
    filename: '[name].[hash].js',
    path: PATHS.output,
    publicPath: '/public/'
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
};

// only applied for dev
if (isDev) {
  config.entry = {
    app: ['react-hot-loader/patch', PATHS.entry]
  };
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: PATHS.output,
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    }
  };

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
