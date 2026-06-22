import { useRef, useState } from "react";
import { AlertCircle, FileText } from "lucide-react";
import { invokeLLM } from "@qb/agentic";
import { useConfigurables } from "~/modules/configurables";
import {
  buildResultSchema,
  buildSystemPrompt,
  buildUserMessage,
  type CompanyProfileInput,
  type MonetizationResult,
} from "~/lib/monetization";
import { Masthead } from "~/components/monetize/masthead";
import { CompanyForm } from "~/components/monetize/company-form";
import {
  StrategyCard,
  StageReadCard,
} from "~/components/monetize/strategy-card";
import { StageBadge } from "~/components/monetize/stage-badge";
import type { TStageOption } from "~/modules/configurables/src/constants/configurables.default";

const DEFAULT_STAGES: TStageOption[] = [
  { id: "pre-revenue", label: "Pre-revenue" },
  { id: "early-traction", label: "Early traction" },
  { id: "scaling", label: "Scaling" },
];

const DEFAULT_SECTORS = ["SaaS / B2B Software", "Consumer / B2C", "Other"];

export default function IndexPage() {
  const { config } = useConfigurables();

  const sectors =
    Array.isArray(config?.sectors) && config.sectors.length > 0
      ? config.sectors
      : DEFAULT_SECTORS;
  const stages =
    Array.isArray(config?.stages) && config.stages.length > 0
      ? config.stages
      : DEFAULT_STAGES;
  const playsToGenerate =
    typeof config?.playsToGenerate === "number" ? config.playsToGenerate : 4;

  const headline =
    config?.introHeadline ?? "Pressure-test how a company makes money.";
  const subhead =
    config?.introSubhead ??
    "Describe the company and its stage. Get a ranked shortlist of monetization plays.";
  const buttonLabel =
    config?.generateButtonLabel ?? "Generate monetization plays";
  const footerNote = config?.footerNote ?? "";

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MonetizationResult | null>(null);
  const [submitted, setSubmitted] = useState<CompanyProfileInput | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function handleGenerate(input: CompanyProfileInput) {
    setGenerating(true);
    setError(null);
    setResult(null);
    setSubmitted(input);

    try {
      const res = await invokeLLM({
        message: buildUserMessage(input, playsToGenerate),
        schema: buildResultSchema(playsToGenerate),
        systemPrompt: buildSystemPrompt(),
      });

      if (res.status === "ERROR" || !res.response) {
        throw new Error(res.error ?? "The strategist could not produce a result.");
      }

      const parsed = res.response as unknown as MonetizationResult;
      if (!Array.isArray(parsed.plays) || parsed.plays.length === 0) {
        throw new Error("No monetization plays were returned. Try refining the description.");
      }

      const plays = [...parsed.plays].sort((a, b) => a.rank - b.rank);
      setResult({ stageRead: parsed.stageRead ?? "", plays });

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong generating the plays.",
      );
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Masthead />

      <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <section className="mb-8 max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {headline}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {subhead}
          </p>
        </section>

        <CompanyForm
          sectors={sectors}
          stages={stages}
          generating={generating}
          buttonLabel={buttonLabel}
          onGenerate={handleGenerate}
        />

        {error ? (
          <div className="mt-6 flex items-start gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        {generating ? (
          <div className="mt-10 space-y-4">
            {Array.from({ length: playsToGenerate }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-lg border border-border bg-card"
              />
            ))}
          </div>
        ) : null}

        {result && submitted ? (
          <div ref={resultsRef} className="mt-12 scroll-mt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  Monetization shortlist
                </div>
                <p className="text-sm text-muted-foreground">
                  {submitted.sector} · {result.plays.length} ranked plays
                </p>
              </div>
              <StageBadge label={submitted.stageLabel} stageId={submitted.stageId} />
            </div>

            {result.stageRead ? <StageReadCard text={result.stageRead} /> : null}

            <div className="space-y-4">
              {result.plays.map((play) => (
                <StrategyCard key={play.rank} play={play} />
              ))}
            </div>
          </div>
        ) : null}

        {footerNote ? (
          <footer className="mt-16 border-t border-border pt-6">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {footerNote}
            </p>
          </footer>
        ) : null}
      </main>
    </div>
  );
}
