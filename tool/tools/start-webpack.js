const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("../webpack.config");

const { readModuleConfig } = require("../utils/readModuleConfig");
const {
  WebpackDevConfig,
} = require("../utils/WebpackConfigs/WebpackDevConfig");

const { deployPackages } = require("../utils/deployPackages");

async function startWebpack() {
  const moduleConfig = readModuleConfig();

  if (moduleConfig.packageModules)
    await deployPackages(moduleConfig.packageModules);

  const compiler = Webpack(new WebpackDevConfig(config).getConfig());
  await new WebpackDevServer(compiler).listen(
    moduleConfig.port,
    moduleConfig.host
  );
}

module.exports = {
  startWebpack,
};
