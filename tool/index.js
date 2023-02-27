#!/usr/bin/env node

const { Command } = require("commander");

const { startWebpack } = require("./tools/start-webpack");
const { buildWebpack } = require("./tools/build-webpack");

(async () => {
  await new Command()
    .addCommand(new Command("start:webpack").alias("sw").action(startWebpack))
    .addCommand(
      new Command("build:webpack")
        .alias("bw")
        .option("--dev", "Билдит проект под dev режим")
        .action(buildWebpack)
    )
    .parseAsync(process.argv);
})();
