import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

const Component = React.lazy(() => import("./Component").then((c) => c));

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <Suspense fallback={null}>
    <Component />
    ROOT App
  </Suspense>
);
