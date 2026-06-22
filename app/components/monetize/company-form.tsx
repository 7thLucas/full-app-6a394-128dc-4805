import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";
import type { CompanyProfileInput } from "~/lib/monetization";
import type { TStageOption } from "~/modules/configurables/src/constants/configurables.default";

interface CompanyFormProps {
  sectors: string[];
  stages: TStageOption[];
  generating: boolean;
  buttonLabel: string;
  onGenerate: (input: CompanyProfileInput) => void;
}

const fieldLabel =
  "block text-xs font-semibold uppercase tracking-wide text-muted-foreground";
const fieldBase =
  "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors";

export function CompanyForm({
  sectors,
  stages,
  generating,
  buttonLabel,
  onGenerate,
}: CompanyFormProps) {
  const [description, setDescription] = useState("");
  const [sector, setSector] = useState(sectors[0] ?? "");
  const [stageId, setStageId] = useState(stages[0]?.id ?? "");
  const [currentModel, setCurrentModel] = useState("");

  const activeStage = stages.find((s) => s.id === stageId) ?? stages[0];
  const canSubmit = description.trim().length > 12 && !generating;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canSubmit || !activeStage) return;
    onGenerate({
      description: description.trim(),
      sector,
      stageId: activeStage.id,
      stageLabel: activeStage.label,
      currentModel: currentModel.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-border bg-card p-6 sm:p-8"
    >
      <div className="space-y-2">
        <label htmlFor="description" className={fieldLabel}>
          Company description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="What does the company do, who does it serve, and what early signal exists? The more specific, the sharper the plays."
          className={cn(fieldBase, "resize-y leading-relaxed")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="sector" className={fieldLabel}>
            Sector
          </label>
          <select
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className={cn(fieldBase, "cursor-pointer")}
          >
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="currentModel" className={fieldLabel}>
            Current business model
          </label>
          <input
            id="currentModel"
            value={currentModel}
            onChange={(e) => setCurrentModel(e.target.value)}
            placeholder="e.g. free beta, one-off services, none yet"
            className={fieldBase}
          />
        </div>
      </div>

      <div className="space-y-2">
        <span className={fieldLabel}>Stage</span>
        <div className="grid gap-2 sm:grid-cols-3">
          {stages.map((s) => {
            const active = s.id === stageId;
            return (
              <button
                type="button"
                key={s.id}
                onClick={() => setStageId(s.id)}
                aria-pressed={active}
                className={cn(
                  "rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                  active
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-input bg-card text-foreground hover:border-primary/40",
                )}
              >
                <span className="font-medium">{s.label}</span>
              </button>
            );
          })}
        </div>
        {activeStage?.hint ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {activeStage.hint}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
        <p className="text-xs text-muted-foreground">
          Recommendations adapt to the selected stage.
        </p>
        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity",
            !canSubmit && "cursor-not-allowed opacity-50",
          )}
        >
          {generating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {generating ? "Analyzing…" : buttonLabel}
        </button>
      </div>
    </form>
  );
}
