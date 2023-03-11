const headScripts = `
    <script src="./dist/system.min.js"></script>
    <script src="./dist/extras/amd.min.js"></script>
    <script src="./dist/extras/named-exports.min.js"></script>
    <script src="./importmap.json" type="systemjs-importmap"></script>
    <script src="./core-importmap.json" type="systemjs-importmap"></script>
    <script>
        System.import("app")
    </script>
`;

module.exports = { headScripts };
