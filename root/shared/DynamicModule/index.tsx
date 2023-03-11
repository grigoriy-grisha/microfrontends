import React, { useEffect, useState } from "react";
import AsyncLoadModule from "../AsyncLoadModule";

type DynamicModuleProps = {
  packageName: string;
  name?: string;
};

function DynamicModule({ packageName, name }: DynamicModuleProps) {
  const [importPath, setImportPath] = useState("");

  useEffect(() => {
    fetch(`${packageName}/importmap.json`)
      .then((response) => response.json())
      .then(({ imports }) => imports[name || packageName])
      .then(setImportPath);
  }, []);

  return <>{!!importPath && <AsyncLoadModule path={importPath} />}</>;
}

export default DynamicModule;
