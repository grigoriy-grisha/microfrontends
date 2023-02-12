const path = require("path");

module.exports = {
    readModuleConfig: () => require(path.resolve('module.config.js'))
}
