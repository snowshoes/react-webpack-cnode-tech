import express from 'express';
import { renderToString } from 'react-dom/server';
// import serverEntry from '../dist/server-entry';
// const server = require('express');
// const ReactSSR = require('react-dom/server');
// const serverEntry = require('../dist/server-entry').default;
// 如果使用上述require commonjs的规范的话，则编译报错，
// 因为server-entry.js文件默认export出来的<App />变量是default
// 两种解决办法， 1. 要么用上面的注释掉的内容，在require出来的serverEntry变量后面.default得到
// const serverEntry = require('../dist/server-entry').default;
// (可以通过console.log(serverEntry))得知
// 2. 要么就采用让nodejs识别import的方法，(通过babel-node)做一下transpile
// https://stackoverflow.com/questions/42645548/using-import-in-nodejs-server
// npm i -D babel-cli
// package.json => bael-node server/server.js
import fs from 'fs';
import path from 'path';
import favicon from 'serve-favicon';

// HOWTO: avoid process.env (eslint: no-process-env)
// SOLUTION: webpack.DefinPlugin
// https://github.com/react-boilerplate/react-boilerplate/issues/1250
// How to avoid undef-var eslint check for global variable in webpack ?
// https://stackoverflow.com/questions/39053562/eslint-no-undef-and-webpack-plugin?rq=1
const isDev = process.env.NODE_ENV === 'development';

const PATHS = {
  index: path.join(__dirname, '../dist/index.html'),
  static: path.join(__dirname, '../dist'),
  wsicon: path.join(__dirname, '../favicon.ico')
};

const app = express();
const PORT = 3333;

// console.log(serverEntry);

app.use(favicon(PATHS.wsicon));

if (!isDev) {
  const template = fs.readFileSync(PATHS.index, 'utf-8');

  app.use('/public', express.static(PATHS.static));

  app.get('*', (req, res) => {
    // const appString = renderToString(serverEntry);
    const appString = renderToString();
    const renderedHTML = template.replace('<!-- app -->', appString);
    res.send(renderedHTML);
  });
} else {
  // https://github.com/gaearon/react-hot-boilerplate/issues/103
  // https://stackoverflow.com/questions/37487007/eslint-es6-redux-global-required-unexpected-require
  /*  eslint-disable global-require */
  const devStatic = require('./util/dev-static');
  /*  eslint-disable global-require */
  devStatic(app);
}

app.listen(PORT, () => {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
