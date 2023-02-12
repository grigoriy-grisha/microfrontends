const webpack = require("webpack");

const { readModuleConfig } = require("../utils/readModuleConfig");
const { WebpackConfigBuilder } = require("../utils/WebpackConfig");
const config = require("../webpack.config");

async function buildWebpack(options) {
  const moduleConfig = readModuleConfig();

  const compiler = webpack(
    new WebpackConfigBuilder(config, options)
      .setOutputFileName(moduleConfig.name)
      .generateImportMap(moduleConfig.name, moduleConfig.basePath)
      .useHtml()
      .getConfig()
  );

  compiler.run((err, res) => {
    if (err) console.log(err);
  });
}

module.exports = {
  buildWebpack,
};
