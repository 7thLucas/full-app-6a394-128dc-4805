# MonetizeMaxxing — Product

## What it is
MonetizeMaxxing is an AI monetization strategist. A user describes a company (description, sector, stage, current business model) and the app returns a ranked, stage-appropriate shortlist of monetization strategies — each with model type, why it fits this company at this stage, the revenue logic/economics, and one concrete experiment to validate it. Output is clean and presentable, designed to be shown to a founder or an investment committee.

## Who it's for
A VC at Square Peg, with two jobs to be done:
- Portfolio value-creation: help founders find and sharpen the best monetization path with a defensible recommendation.
- Deal-evaluation lens: pressure-test how a potential investment could monetize, as input to an IC memo.

## Core flow (v1 — the single core engine)
1. Describe the company: free-text description, sector, stage (pre-revenue / early traction / scaling), and current business model.
2. Generate: the app returns a RANKED shortlist of stage-appropriate monetization strategies.
3. Each play includes: (a) model type, (b) why it fits this company at this stage, (c) the revenue logic / economics, (d) one concrete experiment to validate it.
4. Recommendations MUST adapt to the selected stage — the same company gets different plays at pre-revenue vs early traction vs scaling.

## Tone & brand
Sharp, credible, advisor-grade. Speaks the language of founders and investors — pricing, packaging, revenue models, GTM — without fluff. Calm and confident, not hypey. Outputs read like a strong analyst memo, not marketing copy.

## Strategic principles
- Testable over clever — every play ships with a cheap way to validate it.
- Fit before volume — rank by fit to this specific company and stage, not generic popularity.
- Reasoned, not asserted — always show the "why" so the user can defend the play.
- Presentable — output should look IC- and founder-ready.

## Scope (v1 — keep focused)
In scope: the single core engine — company-profile input → ranked, reasoned, stage-adaptive monetization plays with validation experiments.

Explicitly OUT of scope for v1 (planned as later goals — do NOT build now): portfolio history, comparison views across companies, saved decks/analyses.