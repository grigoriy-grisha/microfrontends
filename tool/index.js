#!/usr/bin/env node

const config = require("./webpack.config.js");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const { Command } = require("commander");
const { readModuleConfig } = require("./utils/readModuleConfig");
const { WebpackConfigBuilder } = require("./utils/WebpackConfig");

(async () => {
  await new Command()
    .addCommand(
      new Command("start").alias("s").action(async () => {
        const moduleConfig = readModuleConfig();

        await new WebpackDevServer(
          webpack(
            new WebpackConfigBuilder(config)
              .setOutputFileName(moduleConfig.name)
              .generateImportMap(moduleConfig.name, moduleConfig.basePath)
              .getConfig()
          )
        ).listen(moduleConfig.port, moduleConfig.host);
      })
    )
    .addCommand(
      new Command("build").alias("b").action(async () => {
        const moduleConfig = readModuleConfig();

        const compiler = webpack(
          new WebpackConfigBuilder(config)
            .setOutputFileName(moduleConfig.name)
            .generateImportMap(moduleConfig.name, moduleConfig.basePath)
            .getConfig()
        );

        compiler.run((err, res) => {
          if (err) {
            console.log(err);
          }
        });
      })
    )
    .parseAsync(process.argv);
})();
