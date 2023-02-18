import loadScript from "load-script";
import React, { lazy, useEffect, useState } from "react";
import { memo } from "react";

export const useScript = (url: string) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadScript(url, () => setLoaded(true));
  }, [url]);

  return loaded;
};
//
// export const useRemoteComponent = (url, moduleName) => {
//   const loaded = useScript(
//     "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/efe/esl/2-1-6/esl.js"
//   );
//   const [Component, setComponent] = useState(null);
//   useEffect(() => {
//     if (loaded) {
//       window.require.config({ baseUrl: "/", paths: { [moduleName]: url } });
//     }
//   }, [loaded]);
//   useEffect(() => {
//     if (loaded) {
//       window.require([moduleName], (factory) => {
//         const Component = factory({ React });
//         setComponent(() => Component);
//       });
//     }
//   }, [loaded, url, moduleName]);
//   return Component;
// };

function Component() {
  const [Component, setComponent] = useState<React.FC>(null);

  useEffect(() => {
    fetch("./micro/path/importmap.json")
      .then((res) => res.json())
      .then((res) => {
        // loadScript(`/${res.imports["micro/path/"]}`, (s) => {
        //   console.log(s);
        // });
        // console.log(res.imports["micro/path/"]);
        // React.lazy(async () => {
        //   console.log("ads");
        //   console.log(a);
        //   return a;
        // });
        // console.log(a);
        // setComponent(a);

        const Module = lazy(async () => {
          const application = await System.import(
            `/${res.imports["micro/path/"]}`
          ).then(
            (r) => r,
            (a) => a
          );

          console.log(application);
          return application;
        });

        console.log(Module);

        setComponent(Module);

        // const Add = React.lazy(
        //
        // );
        // console.log(Add);
        // setComponent(a);
      });
  }, []);

  if (!Component) return null;

  return (
    <div>
      <Component />
    </div>
  );
}

export default memo(Component);
