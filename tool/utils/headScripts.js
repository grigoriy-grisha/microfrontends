const headScripts = [
  { src: "/dist/system.min.js" },
  { src: "/dist/extras/amd.min.js" },
  { src: "/dist/extras/named-exports.min.js" },
  { src: "/importmap.json", type: "systemjs-importmap" },
  { src: "/core-importmap.json", type: "systemjs-importmap" },
  { content: 'System.import("app")' },
];

module.exports = { headScripts };
