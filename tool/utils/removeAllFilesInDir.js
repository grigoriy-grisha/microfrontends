const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");

function removeAllFilesInDir(dirPath) {
  fs.readdirSync(dirPath).forEach((filePath) => {
    const resolvedPath = path.resolve(dirPath, filePath);
    const stat = fs.statSync(resolvedPath);
    if (stat.isFile()) fsExtra.remove(resolvedPath);
  });
}

module.exports = { removeAllFilesInDir };
