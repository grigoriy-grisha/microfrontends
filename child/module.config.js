module.exports = {
  name: "micro",
  port: 1337,
  host: "localhost",
  basePath: "micro/path/",

  modules: [{ name: "../root", root: true, local: true }],
};
