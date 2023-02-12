const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { re } = require("@babel/core/lib/vendor/import-meta-resolve");

class WebpackConfigBuilder {
  constructor(config, options) {
    this.config = config;
    this.options = options;
  }

  getConfig() {
    return this.config;
  }

  setOutputFileName(name) {
    this.config.output.filename = `${name}.[hash].js`;
    return this;
  }

  generateImportMap(name, basePath) {
    if (this.options.root) return this;

    this.config.plugins.push(
      new WebpackManifestPlugin({
        fileName: "import-map.json",
        generate: (_, __, entries) => ({
          imports: {
            [name]: path.join(basePath, entries.main[0]),
          },
        }),
      })
    );

    return this;
  }

  useHtml() {
    if (!this.options.root) return this;

    this.config.plugins.push(new HtmlWebpackPlugin({ template: "index.html" }));
    return this;
  }
}

module.exports = {
  WebpackConfigBuilder,
};
