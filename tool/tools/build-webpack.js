const webpack = require("webpack");

const { readModuleConfig } = require("../utils/readModuleConfig");
const { WebpackConfigBuilder } = require("../utils/WebpackConfig");
const config = require("../webpack.config");
const pacote = require("pacote");
const libnpmconfig = require("libnpmconfig");
const npa = require("npm-package-arg");
const path = require("path");
const fsExtra = require("fs-extra");

async function buildWebpack(options) {
  const moduleConfig = readModuleConfig();

  const npmConfig = {
    ...libnpmconfig.read().toJSON(),
  };

  // const manifest = await pacote.manifest(ss.raw, npmConfig);
  const relativeFolder = path.relative(
    process.cwd(),
    `${moduleConfig.modules[0].name}`
  );
  // const isLatest = ss.fetchSpec === "latest";
  //
  // const versionToInstall =
  //   ss.rawSpec || (isLatest ? manifest.version : ss.fetchSpec);

  // console.log([ss.name, versionToInstall].filter(Boolean).join("@"));
  // console.log(relativeFolder);
  // await fsExtra.ensureDir(relativeFolder);
  // pacote
  //   .extract(
  //     [ss.name, versionToInstall].filter(Boolean).join("@"),
  //     relativeFolder,
  //     npmConfig
  //   )
  //   .then(({ from, resolved, integrity }) => {
  //     console.log("extracted!", from, resolved, integrity);
  //   });

  const compiler = webpack(
    new WebpackConfigBuilder(config, options)
      .addRootEntry(moduleConfig.modules[0].name)
      .addEntry(moduleConfig.basePath, "./")
      .setOutputFileName(moduleConfig.name)
      .generateImportMap(moduleConfig.name)
      .setOutputPublicPath(moduleConfig.basePath)
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
