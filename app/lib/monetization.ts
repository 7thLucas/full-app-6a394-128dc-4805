/**
 * MonetizeMaxxing — core engine helpers (client-safe).
 *
 * Builds the stage-adaptive prompt + strict JSON schema handed to the agentic
 * LLM route (`invokeLLM` from `@qb/agentic`), and types the structured result.
 *
 * No server-only imports here — this module is reachable from the browser.
 */

export interface CompanyProfileInput {
  /** Free-text description of what the company does, who it serves. */
  description: string;
  /** Sector / vertical (from the configurable sector list). */
  sector: string;
  /** Stage id: e.g. "pre-revenue" | "early-traction" | "scaling". */
  stageId: string;
  /** Human label for the stage, e.g. "Early traction". */
  stageLabel: string;
  /** Current business model / how (if at all) it makes money today. */
  currentModel: string;
}

export interface MonetizationPlay {
  /** 1-based rank; 1 is the strongest-fit play. */
  rank: number;
  /** Short name of the monetization model, e.g. "Usage-based pricing". */
  modelType: string;
  /** One-line positioning of the play. */
  headline: string;
  /** Why this fits THIS company at THIS stage. */
  whyItFits: string;
  /** The revenue logic / unit economics behind the play. */
  revenueLogic: string;
  /** One concrete, cheap experiment to validate the play. */
  experiment: string;
  /** Qualitative fit confidence. */
  fit: "Strong" | "Moderate" | "Exploratory";
}

export interface MonetizationResult {
  /** One-paragraph analyst read of the company at its stage. */
  stageRead: string;
  /** Ranked plays, strongest first. */
  plays: MonetizationPlay[];
}

/**
 * Strict JSON schema enforced by the LLM route so the UI can render
 * deterministically.
 */
export function buildResultSchema(playsToGenerate: number): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: ["stageRead", "plays"],
    properties: {
      stageRead: {
        type: "string",
        description:
          "A concise analyst read (2-4 sentences) of where this company is and what its stage implies for monetization.",
      },
      plays: {
        type: "array",
        minItems: playsToGenerate,
        maxItems: playsToGenerate,
        items: {
          type: "object",
          additionalProperties: false,
          required: [
            "rank",
            "modelType",
            "headline",
            "whyItFits",
            "revenueLogic",
            "experiment",
            "fit",
          ],
          properties: {
            rank: { type: "integer", minimum: 1 },
            modelType: { type: "string" },
            headline: { type: "string" },
            whyItFits: { type: "string" },
            revenueLogic: { type: "string" },
            experiment: { type: "string" },
            fit: { type: "string", enum: ["Strong", "Moderate", "Exploratory"] },
          },
        },
      },
    },
  };
}

const STAGE_GUIDANCE: Record<string, string> = {
  "pre-revenue":
    "Pre-revenue: do NOT propose mature, scale-stage pricing machinery. Favor plays that can be tested with little or no product — letters of intent, design-partner deals, concierge/manual delivery, pre-orders, paid pilots. Economics should be framed as hypotheses to validate willingness-to-pay, not optimized unit economics.",
  "early-traction":
    "Early traction: the company has first paying customers and is searching for a repeatable, expandable model. Favor plays that turn early signal into a predictable motion — packaging/tiering, land-and-expand, usage or seat alignment to value, narrowing the ICP. Economics should reference early retention, expansion, and CAC payback as signals to watch.",
  scaling:
    "Scaling: the core model is proven; the job is to compound it. Favor plays that expand revenue per account and open adjacent streams — enterprise tiers, platform/marketplace take-rates, multi-product, partner/channel revenue, price realization. Economics should reference net revenue retention, margin, and durable moats.",
};

/**
 * Build the system prompt — advisor-grade, analyst-memo voice.
 */
export function buildSystemPrompt(): string {
  return [
    "You are a senior monetization strategist working alongside a venture investor.",
    "Your audience is a VC who will put your output in front of a founder or an investment committee, so it must be sharp, credible, and defensible — analyst-memo quality, never hypey marketing copy.",
    "Core principles:",
    "- Fit before volume: rank plays by fit to THIS specific company AT THIS specific stage, not by generic popularity.",
    "- Reasoned, not asserted: every play must explain WHY it fits this company and stage.",
    "- Testable over clever: every play ships with one concrete, cheap experiment to validate it before committing.",
    "Recommendations MUST adapt to the company's stage. The same company gets materially different plays at pre-revenue vs early traction vs scaling.",
    "Speak the language of founders and investors — pricing, packaging, revenue models, GTM, unit economics — without fluff.",
    "Return ONLY valid JSON that matches the provided schema. Rank plays 1..N with 1 being the strongest fit.",
  ].join("\n");
}

/**
 * Build the user message describing the company and stage-specific guidance.
 */
export function buildUserMessage(
  input: CompanyProfileInput,
  playsToGenerate: number,
): string {
  const stageGuidance =
    STAGE_GUIDANCE[input.stageId] ??
    `Stage "${input.stageLabel}": tailor every recommendation to what this stage implies for monetization.`;

  return [
    `Produce a ranked shortlist of exactly ${playsToGenerate} monetization strategies for the company below.`,
    "",
    "COMPANY PROFILE",
    `- Sector: ${input.sector || "(unspecified)"}`,
    `- Stage: ${input.stageLabel}`,
    `- Current business model: ${input.currentModel || "(none / not yet monetizing)"}`,
    "- Description:",
    input.description,
    "",
    "STAGE-SPECIFIC GUIDANCE (apply strictly):",
    stageGuidance,
    "",
    "For EACH play provide:",
    "1. modelType — the monetization model (e.g. usage-based, per-seat, tiered SaaS, marketplace take-rate, licensing, transaction fee, freemium-to-paid, services-led).",
    "2. headline — a single crisp sentence framing the play.",
    "3. whyItFits — why this play fits THIS company at THIS stage specifically (reference its description and stage).",
    "4. revenueLogic — the revenue logic / unit economics: what is charged, to whom, on what basis, and why the math works at this stage.",
    "5. experiment — ONE concrete, cheap experiment to validate the play quickly, with a clear signal to watch.",
    "6. fit — Strong, Moderate, or Exploratory.",
    "",
    "Order plays by descending fit. The top-ranked play should be the most defensible recommendation for this company at this stage.",
  ].join("\n");
}
