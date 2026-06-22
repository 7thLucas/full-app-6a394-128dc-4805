import { cn } from "~/lib/utils";

/**
 * StageBadge — a muted, legible badge that signals company stage at a glance.
 * Tones are distinct per stage but kept restrained (analyst-memo aesthetic).
 */
export function StageBadge({
  label,
  stageId,
  className,
}: {
  label: string;
  stageId?: string;
  className?: string;
}) {
  // Muted, stage-distinct tones. Kept subtle and composed, not playful.
  const tone =
    stageId === "scaling"
      ? "bg-primary/10 text-primary border-primary/20"
      : stageId === "early-traction"
        ? "bg-accent text-accent-foreground border-primary/15"
        : "bg-secondary text-secondary-foreground border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
