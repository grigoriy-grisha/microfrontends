const path = require("path");
const urlJoin = require("url-join");

const { readModuleConfig } = require("./readModuleConfig");

class ModuleConfig {
  constructor() {
    this.init();
  }

  init() {
    this.moduleConfig = readModuleConfig();
    this.deployModules = this.getModules();

    this.collectModulesConfigs();
  }

  getPort() {
    return this.moduleConfig.port || 8080;
  }

  getHost() {
    return this.moduleConfig.host || "localhost";
  }

  getName() {
    return this.moduleConfig.name;
  }

  getDeployModules() {
    return this.deployModules;
  }

  getRootModule() {
    if (this.moduleConfig.root) return { name: "main", path: "./" };

    const rootModule = this.findRootModule();
    if (!rootModule) throw new Error("Root module not a found!");

    return { name: "main", path: rootModule.path };
  }

  findRootModule() {
    return this.moduleConfig.modules.find(({ root }) => root);
  }

  getModules() {
    const modules = [];

    if (!this.moduleConfig.root) {
      modules.push(
        this.mapModuleConfigToDeployModule({ ...this.moduleConfig, path: "./" })
      );
    }

    return this.collectModulesConfigs()
      .map(this.mapModuleConfigToDeployModule)
      .concat(modules);
  }

  mapModuleConfigToDeployModule({ name, basePath, path }) {
    return { name, basePath, path };
  }

  collectModulesConfigs() {
    const modules = this.moduleConfig.modules.filter(({ root }) => !root);

    const collectedModules = [];
    for (const module of modules) {
      const moduleInfo = require(path.resolve(
        urlJoin(module.path, "module.config.js")
      ));

      collectedModules.push({ ...moduleInfo, path: module.path });
    }

    return collectedModules;
  }
}

module.exports = { ModuleConfig };
