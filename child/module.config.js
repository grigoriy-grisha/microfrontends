module.exports = {
  name: "micro",
  port: 1337,
  host: "localhost",
  basePath: "micro/path/",

  modules: [{ path: "../root/", root: true }, { path: "../child-2/" }],
  packageModules: ["@grigga/child-2@latest"],
};
