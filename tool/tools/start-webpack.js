const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("../webpack.config");

const { readModuleConfig } = require("../utils/readModuleConfig");
const {
  WebpackDevConfig,
} = require("../utils/WebpackConfigs/WebpackDevConfig");

const readline = require("readline");

async function startWebpack() {
  const moduleConfig = readModuleConfig();

  await new WebpackDevServer(
    Webpack(new WebpackDevConfig(config).getConfig())
  ).listen(moduleConfig.port, moduleConfig.host);
}

module.exports = {
  startWebpack,
};
