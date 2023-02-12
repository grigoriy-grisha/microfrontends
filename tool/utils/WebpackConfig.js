const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const path = require("path");

class WebpackConfigBuilder {
  constructor(config) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }

  setOutputFileName(name) {
    this.config.output.filename = `${name}.[hash].js`;
    return this;
  }

  generateImportMap(name, basePath) {
    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: "import-map.json",
        generate: (_, __, entries) => ({
          imports: {
            [name]: path.join(basePath, entries.main[0]),
          }
        }),
      })
    );

    return this;
  }
}

module.exports = {
  WebpackConfigBuilder,
};
