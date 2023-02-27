const urlJoin = require("url-join");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const { ModuleConfig } = require("../ModuleConfig");

class WebpackProdConfig {
  constructor(config) {
    this.moduleConfig = new ModuleConfig();

    this.config = config;

    this.init();
  }

  init() {
    this.addEntry();
    this.setOutputFileName();
    this.generateImportMap();
  }

  getConfig() {
    return this.config;
  }

  addEntry() {
    this.config.entry[this.moduleConfig.getBasePath()] = "./src/index.tsx";
  }

  setOutputFileName() {
    this.config.output.filename = `[name].[hash].js`;
  }

  generateImportMap() {
    const basePath = this.moduleConfig.getBasePath();

    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: urlJoin(basePath, "importmap.json"),
        generate: (_, file, entries) => ({
          imports: {
            [this.moduleConfig.getName()]: `/${entries[basePath][0]}`,
          },
        }),
      })
    );
  }
}

module.exports = { WebpackProdConfig };
