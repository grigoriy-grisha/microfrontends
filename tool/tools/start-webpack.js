const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("../webpack.config");

const { readModuleConfig } = require("../utils/readModuleConfig");
const { WebpackConfigBuilder } = require("../utils/WebpackConfig");

async function startWebpack(options) {
  const moduleConfig = readModuleConfig();

  await new WebpackDevServer(
    webpack(
      new WebpackConfigBuilder(config, options)
        .setOutputFileName(moduleConfig.name)
        .generateImportMap(moduleConfig.name, moduleConfig.basePath)
        .useHtml()
        .getConfig()
    )
  ).listen(moduleConfig.port, moduleConfig.host);
}

module.exports = {
  startWebpack,
};
