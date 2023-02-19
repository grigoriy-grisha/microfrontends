import React, { lazy, Suspense } from "react";

type AsyncLoadModuleProps = {
  path: string;
};

function AsyncLoadModule({ path }: AsyncLoadModuleProps) {
  const Module = lazy(async () => {
    const application = await (window as any).System.import(path).then(
      (r) => r,
      (e) => e
    );

    console.log(application);
    return application;
  });

  return (
    <Suspense fallback={null}>
      <Module />
    </Suspense>
  );
}

export default AsyncLoadModule;
