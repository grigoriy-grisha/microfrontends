const path = require("path");
const pacote = require("pacote");
const fsExtra = require("fs-extra");
const { removeAllFilesInDir } = require("./removeAllFilesInDir");

async function deployPackages(packages) {
  for (const packageName of packages) {
    await deployPackage(packageName);
  }
}

async function deployPackage(packageName) {
  const relativeFolder = path.relative(process.cwd(), `.temp-packages`);
  await pacote.extract(packageName, relativeFolder, {});
  await fsExtra.copy("./.temp-packages/dist", "./.temp-packages");
  await fsExtra.remove("./.temp-packages/dist");
  await removeAllFilesInDir(relativeFolder);
}

module.exports = { deployPackages };
