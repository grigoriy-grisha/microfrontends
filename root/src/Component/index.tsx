import React, { memo } from "react";
import DynamicModule from "../../shared/DynamicModule";

function Component() {
  return (
    <div>
      <DynamicModule packageName="microfronts" />
      <DynamicModule packageName="@grisha/microfronts-child" />
      <DynamicModule packageName="micro-2/path" name="micro-2" />
    </div>
  );
}

export default memo(Component);
