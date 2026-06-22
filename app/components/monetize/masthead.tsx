import { useConfigurables } from "~/modules/configurables";

/**
 * Masthead — the brand bar at the top of the workspace. Advisor-grade:
 * a quiet wordmark, optional logo, and the configurable tagline.
 */
export function Masthead() {
  const { config, loading } = useConfigurables();

  const appName = config?.appName ?? "MonetizeMaxxing";
  const tagline = config?.tagline ?? "";
  const logoUrl = config?.logoUrl ?? "";

  return (
    <header className="border-b border-border bg-navbar">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-4">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`${appName} logo`}
            className="h-8 w-8 rounded-md object-contain"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            {appName.slice(0, 1)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-base font-semibold tracking-tight text-foreground">
            {loading ? " " : appName}
          </p>
          {tagline ? (
            <p className="truncate text-xs text-muted-foreground">{tagline}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
