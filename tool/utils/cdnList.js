const cdnList = [
  {
    name: "systemjs",
    var: "systemjs",
    path: "dist/system.min.js",
  },
  {
    name: "systemjs",
    var: "amd",
    path: "dist/extras/amd.min.js",
  },
  {
    name: "systemjs",
    var: "named-exports",
    path: "dist/extras/named-exports.min.js",
  },
  { name: "react", path: "umd/react.production.min.js" },
  {
    name: "react-dom",
    path: "umd/react-dom.production.min.js",
  },
];

module.exports = { cdnList };
