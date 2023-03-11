const urlJoin = require("url-join");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { ModuleConfig } = require("../ModuleConfig");
const { headScripts } = require("../headScripts");
const { copyPatterns } = require("../copyPatterns");
const { cdnList } = require("../cdnList");

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
    this.useHtml();
    this.settingExternals();
    this.addCdnSystemJs();
    this.generateMainImportmap();
    this.generateCoreImportmap();
  }

  getConfig() {
    return this.config;
  }

  addEntry() {
    if (this.moduleConfig.isSelfRoot()) {
      this.config.entry.main = "./src/index.tsx";
      return;
    }

    this.config.entry[`${this.moduleConfig.getBuildPackageName()}/`] =
      "./src/index.tsx";
  }

  setOutputFileName() {
    this.config.output.filename = `[name].[hash].js`;
  }

  generateImportMap() {
    if (this.moduleConfig.isSelfRoot()) return;

    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: urlJoin(
          this.moduleConfig.getBuildPackageName(),
          "importmap.json"
        ),
        generate: (_, file, entries) => ({
          imports: {
            [this.moduleConfig.getBuildPackageName()]: `./${
              entries[`${this.moduleConfig.getBuildPackageName()}/`][0]
            }`,
          },
        }),
      })
    );
  }

  generateMainImportmap() {
    if (!this.moduleConfig.isSelfRoot()) return;

    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: `importmap.json`,
        generate: (_, file, entries) => ({
          imports: { ["app"]: `./${entries["main"][0]}` },
        }),
      })
    );
  }

  generateCoreImportmap() {
    if (!this.moduleConfig.isSelfRoot()) return;

    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: `core-importmap.json`,
        generate: () => ({
          imports: {
            react: "./umd/react.production.min.js",
            "react-dom": "./umd/react-dom.production.min.js",
          },
        }),
      })
    );
  }

  useHtml() {
    if (!this.moduleConfig.isSelfRoot()) return;

    const rooModule = this.moduleConfig.getRootModule();

    this.config.plugins.push(
      new HtmlWebpackPlugin({
        template: urlJoin(rooModule.path, "index.html"),
        chunks: [],
        headScripts,
        templateParameters: () => ({ headScripts }),
      })
    );
  }

  settingExternals() {
    if (!this.moduleConfig.isSelfRoot()) return;

    this.config.externals = {};
  }

  addCdnSystemJs() {
    if (!this.moduleConfig.isSelfRoot()) return;

    this.config.plugins.push(
      new CopyWebpackPlugin({ patterns: [...copyPatterns("./", cdnList)] })
    );
  }
}

module.exports = { WebpackProdConfig };
