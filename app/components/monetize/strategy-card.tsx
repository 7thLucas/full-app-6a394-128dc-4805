import { TrendingUp, Lightbulb, FlaskConical, Coins } from "lucide-react";
import type { MonetizationPlay } from "~/lib/monetization";
import { cn } from "~/lib/utils";

function FitTag({ fit }: { fit: MonetizationPlay["fit"] }) {
  const tone =
    fit === "Strong"
      ? "bg-primary/10 text-primary"
      : fit === "Moderate"
        ? "bg-accent text-accent-foreground"
        : "bg-secondary text-muted-foreground";
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", tone)}>
      {fit} fit
    </span>
  );
}

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="text-sm leading-relaxed text-card-foreground">{children}</p>
    </div>
  );
}

/**
 * StrategyCard — one ranked monetization play, rendered IC-ready.
 * The top play (rank 1) gets subtle emphasis via a primary left rail.
 */
export function StrategyCard({ play }: { play: MonetizationPlay }) {
  const isTop = play.rank === 1;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card transition-shadow",
        isTop && "ring-1 ring-primary/30",
      )}
    >
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-1",
          isTop ? "bg-primary" : "bg-border",
        )}
        aria-hidden
      />
      <div className="space-y-5 p-6 pl-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-base font-semibold tabular-nums",
                isTop
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              {play.rank}
            </span>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-tight tracking-tight text-card-foreground">
                {play.modelType}
              </h3>
              <p className="text-sm text-muted-foreground">{play.headline}</p>
            </div>
          </div>
          <FitTag fit={play.fit} />
        </div>

        <div className="grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
          <Section icon={<Lightbulb className="h-3.5 w-3.5" />} label="Why it fits">
            {play.whyItFits}
          </Section>
          <Section icon={<Coins className="h-3.5 w-3.5" />} label="Revenue logic">
            {play.revenueLogic}
          </Section>
        </div>

        <div className="rounded-md border border-border bg-accent/50 p-4">
          <Section
            icon={<FlaskConical className="h-3.5 w-3.5" />}
            label="Validate it"
          >
            {play.experiment}
          </Section>
        </div>
      </div>
    </article>
  );
}

export function StageReadCard({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5 text-primary" />
        Stage read
      </div>
      <p className="text-sm leading-relaxed text-card-foreground">{text}</p>
    </div>
  );
}
