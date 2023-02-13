const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { re } = require("@babel/core/lib/vendor/import-meta-resolve");

class WebpackConfigBuilder {
  constructor(config, options) {
    this.config = config;
    this.options = options;
  }

  addRootEntry(mainPath) {
    this.config.entry.main = path.join(mainPath, "src/index.tsx");
    return this;
  }

  addEntry(publicPath, modulePath) {
    this.config.entry[publicPath] = "./src/index.tsx";
    console.log(this.config.entry);
    return this;
  }

  getConfig() {
    return this.config;
  }

  setOutputFileName(name) {
    // this.config.output.filename = `${name}.[hash].js`;
    return this;
  }

  setOutputPublicPath(basePath) {
    // if (this.options.root) return this;

    // this.config.output.path = path.resolve(
    //   process.cwd(),
    //   path.join("dist", basePath)
    // );

    return this;
  }

  generateImportMap(name) {
    if (this.options.root) return this;

    const entryKeys = Object.keys(this.config.entry);

    entryKeys.forEach((key) => {
      if (key !== "main") {
        this.config.plugins.push(
          new WebpackManifestPlugin({
            map: (file) => {
              return file;
            },
            useEntryKeys: true,
            fileName: `${key}import-map.json`,
            generate: (_, file, entries) => ({
              imports: Object.fromEntries(
                Object.entries(entries)
                  .filter(([keyPath]) => key === keyPath)
                  .map(([key, [value]]) => [key, value])
              ),
            }),
          })
        );
      }
    });

    return this;
  }

  useHtml() {
    // if (!this.options.root) return this;

    this.config.plugins.push(
      new HtmlWebpackPlugin({
        template: "../root/index.html",
      })
    );
    return this;
  }
}

module.exports = {
  WebpackConfigBuilder,
};
