module.exports = {
  name: "micro",
  port: 1337,
  host: "localhost",
  basePath: "micro/path/",

  modules: [
    { path: "../root", root: true, local: true },
    { path: "../child-2/" },
  ],
};
