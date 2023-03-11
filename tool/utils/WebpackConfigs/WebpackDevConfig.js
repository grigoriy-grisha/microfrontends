const urlJoin = require("url-join");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

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
    this.addModulesToDist();
  }

  getConfig() {
    return this.config;
  }

  addRootEntry() {
    const rootPath = this.moduleConfig.getRootModule().path;
    this.config.entry.main = urlJoin(rootPath, "src/index.tsx");
  }

  addEntry() {
    this.moduleConfig.getDeployModules().forEach(({ path, packageName }) => {
      this.config.entry[packageName] = urlJoin(path, "src/index.tsx");
    });
  }

  setOutputFileName() {
    this.config.output.filename = `[name]/.[hash].js`;
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
          imports: { ["app"]: `./${entries["main"][0]}` },
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
    this.moduleConfig.getDeployModules().forEach(({ packageName, name }) => {
      this.config.plugins.push(
        new WebpackManifestPlugin({
          fileName: urlJoin(packageName, "importmap.json"),
          generate: (_, file, entries) => ({
            imports: { [packageName]: `./${entries[packageName][0]}` },
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

  addModulesToDist() {
    if (!this.moduleConfig.hasPackageModules()) return;

    this.config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(process.cwd(), ".temp-packages"), to: "./" },
        ],
      })
    );
  }
}

module.exports = { WebpackDevConfig };
