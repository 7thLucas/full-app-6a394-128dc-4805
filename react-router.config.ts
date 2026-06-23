import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // Eagerly register every route in the manifest instead of discovering them
  // lazily ("Fog of War"). Lazy discovery was leaving newly-added routes such
  // as /firm unmatched on the running server, producing a hard 404 / blank,
  // non-interactive page. Initial discovery ships the full route table up front.
  routeDiscovery: { mode: "initial" },
} satisfies Config;
