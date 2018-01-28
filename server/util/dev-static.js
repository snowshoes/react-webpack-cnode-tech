const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs');
// const proxy = require('http-proxy-middleware');
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

// prettier-ignore
const mfs = new MemoryFs();
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

  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = new Module();
  m._compile(bundle, 'staticserver.js');
  serverBundle = m.default;
});

module.exports = (app) => {
  app.get('*', (req, res) => {
    getTemplate().then((template) => {
      const content = ReactDOMServer.renderToString(serverBundle);
      res.send(template.replace('<!-- app -->', content));
    });
  });
};
