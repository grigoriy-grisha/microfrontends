#!/usr/bin/env node

const { Command } = require("commander");

const { startWebpack } = require("./tools/start-webpack");
const { buildWebpack } = require("./tools/build-webpack");

(async () => {
  await new Command()
    .addCommand(
      new Command("start:webpack")
        .alias("sw")
        .option("--root", "Стартует проект, как root, с html и без import-map")
        .action(startWebpack)
    )
    .addCommand(
      new Command("build:webpack")
        .alias("bw")
        .option("--root", "Стартует проект, как root, с html и без import-map")
        .action(buildWebpack)
    )
    .parseAsync(process.argv);
})();
