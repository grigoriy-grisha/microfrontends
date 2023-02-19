const copyPatterns = (outDir, modules) => {
  return modules.reduce(
    (acc, module) => [
      ...acc,
      {
        from: `node_modules/${module.name}/${module.path}`,
        to: `${module.path}`,
      },
    ],
    []
  );
};

module.exports = { copyPatterns };
