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
        .addRootEntry(moduleConfig.modules[0].name)
        .addEntry(moduleConfig.basePath, "./")
        .setOutputFileName(moduleConfig.name)
        .generateImportMap(moduleConfig.name, moduleConfig.basePath)
        .setOutputPublicPath(moduleConfig.basePath)
        .useHtml()
        .getConfig()
    )
  ).listen(moduleConfig.port, moduleConfig.host);
}

module.exports = {
  startWebpack,
};
