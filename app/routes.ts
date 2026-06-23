import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";

export default remixRoutesOptionAdapter((defineRoutes) => {
  // Scan app/routes via remix-flat-routes. Every *.tsx directly under
  // app/routes (e.g. _index.tsx -> "/", firm.tsx -> "/firm") becomes a route.
  return flatRoutes("routes", defineRoutes, {
    ignoredRouteFiles: ["**/.*"],
  });
});
