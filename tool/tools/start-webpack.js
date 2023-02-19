const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("../webpack.config");

const { readModuleConfig } = require("../utils/readModuleConfig");
const { WebpackConfigBuilder } = require("../utils/WebpackConfig");

async function startWebpack() {
  const moduleConfig = readModuleConfig();

  await new WebpackDevServer(
    webpack(
      new WebpackConfigBuilder(config)
        .addRootEntry()
        .addEntry()
        .setOutputFileName()
        .generateImportMap()
        .addCdnSystemJs()
        .setOutputPublicPath()
        .useHtml()
        .getConfig()
    )
  ).listen(moduleConfig.port, moduleConfig.host);
}

module.exports = {
  startWebpack,
};
