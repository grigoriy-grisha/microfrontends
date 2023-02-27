const urlJoin = require("url-join");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { headScripts } = require("../headScripts");
const { copyPatterns } = require("../copyPatterns");
const { cdnList } = require("../cdnList");
const { ModuleConfig } = require("../ModuleConfig");

class WebpackDevConfig {
  constructor(config) {
    this.moduleConfig = new ModuleConfig();

    this.config = config;

    this.init();
  }

  init() {
    this.addRootEntry();
    this.addEntry();
    this.setOutputFileName();
    this.generateImportMap();
    this.addCdnSystemJs();
    this.useHtml();
    this.getConfig();
  }

  getConfig() {
    return this.config;
  }

  addRootEntry() {
    const rootPath = this.moduleConfig.getRootModule().path;
    this.config.entry.main = urlJoin(rootPath, "src/index.tsx");
  }

  addEntry() {
    this.moduleConfig.getDeployModules().forEach(({ path, basePath }) => {
      this.config.entry[basePath] = urlJoin(path, "src/index.tsx");
    });
  }

  setOutputFileName() {
    this.config.output.filename = `[name].[hash].js`;
  }

  generateImportMap() {
    this.generateModulesImportmaps();
    this.generateMainImportmap();
    this.generateCoreImportmap();
  }

  generateMainImportmap() {
    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: `importmap.json`,
        generate: (_, file, entries) => ({
          imports: { ["app"]: `/${entries["main"][0]}` },
        }),
      })
    );
  }

  generateCoreImportmap() {
    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: `core-importmap.json`,
        generate: () => ({
          imports: {
            react: "/umd/react.production.min.js",
            "react-dom": "/umd/react-dom.production.min.js",
          },
        }),
      })
    );
  }

  generateModulesImportmaps() {
    this.moduleConfig.getDeployModules().forEach(({ basePath, name }) => {
      this.config.plugins.push(
        new WebpackManifestPlugin({
          fileName: urlJoin(basePath, "importmap.json"),
          generate: (_, file, entries) => ({
            imports: { [name]: `/${entries[basePath][0]}` },
          }),
        })
      );
    });
  }

  useHtml() {
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

  addCdnSystemJs() {
    this.config.plugins.push(
      new CopyWebpackPlugin({ patterns: [...copyPatterns("./", cdnList)] })
    );
  }
}

module.exports = { WebpackDevConfig };
