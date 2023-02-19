const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleConfig } = require("./ModuleConfig");
const { cdnList } = require("./cdnList");
const { copyPatterns } = require("./copyPatterns");
const { headScripts } = require("./tempalateContent");

class WebpackConfigBuilder {
  constructor(config) {
    this.moduleConfig = new ModuleConfig();

    this.config = config;
  }

  addRootEntry() {
    const rootPath = this.moduleConfig.getRootModule().path;
    this.config.entry.main = `${rootPath}src/index.tsx`;

    return this;
  }

  addEntry() {
    this.moduleConfig.getDeployModules().forEach(({ path, basePath }) => {
      this.config.entry[basePath] = `${path}src/index.tsx`;
    });

    return this;
  }

  getConfig() {
    return this.config;
  }

  setOutputFileName() {
    this.config.output.filename = `[name].[hash].js`;
    return this;
  }

  setOutputPublicPath() {
    return this;
  }

  generateImportMap() {
    this.generateModulesImportmaps();
    this.generateMainImportmap();
    this.generateCoreImportmap();

    return this;
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
          fileName: `${basePath}/importmap.json`,
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
        template: `${rooModule.path}/index.ejs`,
        chunks: [],
        headScripts,
      })
    );

    return this;
  }

  addCdnSystemJs() {
    this.config.plugins.push(
      new CopyWebpackPlugin({ patterns: [...copyPatterns("./", cdnList)] })
    );

    return this;
  }
}

module.exports = {
  WebpackConfigBuilder,
};
