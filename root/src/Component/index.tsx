import React, { useEffect, useState } from "react";
import { memo } from "react";

function Component() {
  const [Component, setComponent] = useState<React.FC>(null);

  useEffect(() => {
    fetch("./micro/path/import-map.json")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.imports["micro/path/"]);

        console.log(`/${res.imports["micro/path/"]}`);
        // const a = React.lazy(
        //   async () => await import(`/${res.imports["micro/path/"]}`)
        // );
        // setComponent(a);
        // System.import(`/${res.imports["micro/path/"]}`).then((s) => {
        //   setComponent(s as any);
        // });
        // const Add = React.lazy(
        //
        // );

        // console.log(Add);
        // setComponent(Add);
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
