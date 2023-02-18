const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const copyPatterns = (outDir, modules) => {
  return modules.reduce(
    (acc, module) => [
      ...acc,
      {
        from: `node_modules/${module.name}/${module.path}`,
        to: `${module.path}`,
      },
    ],
    []
  );
};

const cdnList = [
  {
    name: "systemjs",
    var: "systemjs",
    path: "dist/system.min.js",
  },
  {
    name: "systemjs",
    var: "amd",
    path: "dist/extras/amd.min.js",
  },
  {
    name: "systemjs",
    var: "named-exports",
    path: "dist/extras/named-exports.min.js",
  },
];

const modules = [
  { name: "react", path: "umd/react.production.min.js" },
  {
    name: "react-dom",
    path: "umd/react-dom.production.min.js",
  },
];

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
    // if (this.options.root) return this;
    const entryKeys = Object.keys(this.config.entry);

    entryKeys.forEach((key) => {
      if (key !== "main") {
        this.config.plugins.push(
          new WebpackManifestPlugin({
            map: (file) => {
              return file;
            },
            useEntryKeys: true,
            fileName: `${key}importmap.json`,
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

    this.config.plugins.push(
      new WebpackManifestPlugin({
        map: (file) => {
          return file;
        },
        useEntryKeys: true,
        fileName: `importmap.json`,
        generate: (_, file, entries) => ({
          imports: {
            ["app"]: entries["main"][0],
          },
        }),
      })
    );

    return this;
  }

  useHtml() {
    // if (!this.options.root) return this;

    this.config.plugins.push(
      new HtmlWebpackPlugin({
        template: "../root/index.html",
        chunks: [],
        templateParameters: (options) => {
          const mainScript = Object.keys(options.assets).find((script) =>
            script.startsWith("main")
          );

          return { mainScript };
        },
      })
    );
    return this;
  }

  addCdnSyStemJs() {
    // if (!this.options.root) return this;

    this.config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [...copyPatterns("./", [...cdnList, ...modules])],
      })
    );

    return this;
  }
}

module.exports = {
  WebpackConfigBuilder,
};
