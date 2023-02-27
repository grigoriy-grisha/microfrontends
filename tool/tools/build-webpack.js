const Webpack = require("webpack");

const config = require("../webpack.config");

const {
  WebpackDevConfig,
} = require("../utils/WebpackConfigs/WebpackDevConfig");
const {
  WebpackProdConfig,
} = require("../utils/WebpackConfigs/WebpackProdConfig");

async function buildWebpack(options) {
  console.log(options);

  Webpack(
    options.dev
      ? new WebpackDevConfig(config).getConfig()
      : new WebpackProdConfig(config).getConfig()
  ).run((err, res) => {
    if (err) console.log(err);
  });
}

module.exports = {
  buildWebpack,
};
