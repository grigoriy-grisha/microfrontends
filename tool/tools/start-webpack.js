const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("../webpack.config");

const { readModuleConfig } = require("../utils/readModuleConfig");
const { WebpackConfigBuilder } = require("../utils/WebpackConfig");

const readline = require("readline");

async function startWebpack() {
  const moduleConfig = readModuleConfig();

  const compiler = webpack(
    new WebpackConfigBuilder(config)
      .addRootEntry()
      .addEntry()
      .setOutputFileName()
      .generateImportMap()
      .addCdnSystemJs()
      .setOutputPublicPath()
      .useHtml()
      .getConfig()
  );
  await new WebpackDevServer(compiler).listen(
    moduleConfig.port,
    moduleConfig.host
  );
}

module.exports = {
  startWebpack,
};
