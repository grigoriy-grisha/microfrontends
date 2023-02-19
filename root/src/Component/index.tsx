import React, { memo } from "react";
import DynamicModule from "../../shared/DynamicModule";

function Component() {
  return (
    <div>
      <DynamicModule path="/micro/path" name="micro" />
      <DynamicModule path="/micro-2/path" name="micro-2" />
    </div>
  );
}

export default memo(Component);
