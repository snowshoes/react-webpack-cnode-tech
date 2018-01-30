const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../client/app.js'),
  output: path.join(__dirname, '../dist'),
  modules: path.join(__dirname, '../node_modules'),
  template: path.join(__dirname, '../client/template.html')
};
