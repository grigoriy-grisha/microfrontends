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

  getBasePath() {
    return this.moduleConfig.basePath;
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

  hasPackageModules() {
    const packageModules = this.getPackageModules();

    return packageModules && packageModules.length !== 0;
  }

  getPackageModules() {
    return this.moduleConfig.packageModules;
  }

  getRootModule() {
    if (this.moduleConfig.root) return { name: "main", path: "./" };

    const rootModule = this.findRootModule();
    if (!rootModule) throw new Error("Root module not a found!");

    return { name: "main", path: rootModule.path };
  }

  isSelfRoot() {
    return !!this.moduleConfig.root;
  }

  findRootModule() {
    return this.moduleConfig.modules.find(({ root }) => root);
  }

  getModules() {
    const modules = [];

    if (!this.moduleConfig.root) {
      modules.push(
        this.mapModuleConfigToDeployModule(
          this.collectModuleConfig({ ...this.moduleConfig, path: "./" })
        )
      );
    }

    return this.collectModulesConfigs()
      .map(this.mapModuleConfigToDeployModule)
      .concat(modules);
  }

  getBuildPackageName() {
    return require(path.resolve("package.json")).name;
  }

  mapModuleConfigToDeployModule({ name, basePath, path, packageName }) {
    return { name, basePath, path, packageName };
  }

  collectModuleConfig(module) {
    const moduleInfo = require(path.resolve(
      urlJoin(module.path, "module.config.js")
    ));
    const packageName = require(path.resolve(
      urlJoin(module.path, "package.json")
    )).name;

    return {
      ...moduleInfo,
      path: module.path,
      packageName,
    };
  }

  collectModulesConfigs() {
    const modules = this.moduleConfig.modules.filter(({ root }) => !root);

    const collectedModules = [];
    for (const module of modules) {
      collectedModules.push(this.collectModuleConfig(module));
    }

    return collectedModules;
  }
}

module.exports = { ModuleConfig };
