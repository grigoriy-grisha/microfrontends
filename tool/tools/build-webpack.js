const Webpack = require("webpack");

const fsExtra = require("fs-extra");
const {
  WebpackDevConfig,
} = require("../utils/WebpackConfigs/WebpackDevConfig");
const {
  WebpackProdConfig,
} = require("../utils/WebpackConfigs/WebpackProdConfig");
const { deployPackages } = require("../utils/deployPackages");
const { readModuleConfig } = require("../utils/readModuleConfig");
const config = require("../webpack.config");

async function buildWebpack(options) {
  const moduleConfig = readModuleConfig();

  if (moduleConfig.packageModules) {
    await deployPackages(moduleConfig.packageModules);
  }

  Webpack(
    options.dev
      ? new WebpackDevConfig(config).getConfig()
      : new WebpackProdConfig(config).getConfig()
  ).run(async (error) => {
    if (error) console.log(error);
    if (options.dev) await fsExtra.remove("./.temp-packages");
  });
}

module.exports = {
  buildWebpack,
};
