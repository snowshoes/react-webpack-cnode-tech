const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const ReactDOMServer = require('react-dom/server');

const serverConfig = require('../../build/webpack.config.server');

const getTemplate = () =>
  new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8888/public/index.html')
      .then((res) => {
        resolve(res.data);
      })
      .catch(reject);
  });

// const requireFromString = (src, )
const Module = module.constructor;

const mfs = new MemoryFs();
// 1. webpack 在nodejs中提供了作为模块调用的方式，
// 不仅仅是命令行工具启动打包服务wb.config.js
// 2. 为什么要监听webpack的打包过程? compiler.watch()
// 我们要在服务端渲染的时候，拿到webpack打包的内容
// 通过outputFileSystem = mfs,赋值给mfs，从内存中读取信息加快打包速度
// 这里有一段代码示例：
// https://github.com/jantimon/html-webpack-plugin/issues/145
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({
}, (err, stats) => {
  if (err) throw err;
  const statsJson = stats.toJson();
  statsJson.errors.forEach(error => console.error(error));
  statsJson.warnings.forEach(warning => console.warn(warning));

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  // 3. 内存中的字符串如何转化成模块Module ?
  // 先从内存中读出webpack打包的内容，utf-8模式编码
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');

  // 通过 m = new Module(), m._compile(str)的方法，将字符串转化成模块module
  // ()
  const m = new Module();
  m._compile(bundle, 'staticserver.js'); // eslint-disable-line

  // 编译好之后的模块，通过module.exports.default导出
  serverBundle = m.exports.default;
});

module.exports = (app) => {
  // 因为client端的js全部是在webpack dev server（内存）中存储的
  // 是通过http server服务export出来的
  // 那么通过proxy把所有的静态文件"代理"到 webpack dev server上面

  // 下面的代码，将所有是/public/前缀开头的文件，全部代理到了webpack dev server
  // 也就是npm run dev:server命令启动的server上面
  // 这个proxy去寻找的目标target，则是localhost:8888/public/这个路径下的静态文件

  // 如果不做静态资源proxy代理，错误结果是：
  // 1. 则返回的编译后的js代码（静态资源）无法正常显示：显示的是index.html的代码
  // 2. 无法正常使用 HMR
  // 注释掉这段代码比较前后区别
  app.use(
    '/public',
    proxy({
      target: 'http://localhost:8888'
    })
  );

  // SSR 服务端渲染将client端执行js代码后得多的显示结果，
  // 替换template模板index.html中需要动态生成内容的段落
  app.get('*', (req, res) => {
    getTemplate().then((template) => {
      const content = ReactDOMServer.renderToString(serverBundle);
      res.send(template.replace('<!-- app -->', content));
    });
  });
};
