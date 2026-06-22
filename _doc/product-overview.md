# Product Overview

> Working title: **RevenuePath AI** (provisional — branding to be confirmed with the user)
> Status: initial core truth, drafted at project kickoff. Details to be sharpened as scoping continues.

## What it is

RevenuePath AI is an AI strategist that turns a seed-stage tech company's profile into a
ranked set of monetization strategies the team can actually test. The user describes a
company — what it does, who it serves, its stage and early traction — and the AI returns
concrete revenue plays (pricing models, packaging, revenue streams) with the reasoning
behind each, a fit assessment, and the experiments needed to validate them.

The product is built for working across **many** companies, not just one: it is a tool
for someone who repeatedly faces the "how does this make money?" question and needs
structured, defensible answers fast.

## Who it's for

The primary holder is a **VC** (confirmed: an investor at Square Peg) who evaluates
monetization across many seed-stage tech companies. The product serves two distinct jobs
for them:

- **Portfolio value-creation** — helping existing portfolio companies find and sharpen
  the best monetization path, so a partner can put a defensible recommendation in front
  of a founder.
- **Deal-evaluation lens** — pressure-testing how a *potential* investment could
  monetize, as input to an investment decision or IC memo.

A defining nuance: monetization strategy must **adapt by company stage** (pre-revenue →
early traction → scaling). The same company gets different recommended plays depending on
where it is, and the app reasons explicitly about stage.

Secondary, still-served personas (the tool remains useful to them, but the VC is the
design center): accelerator/incubator program leads, angels and other early-stage
investors, startup advisors productizing a monetization playbook, and seed-stage founders
pressure-testing their own model.

## Core workflow

1. **Describe the company** — sector, product, target customer, stage, early traction,
   and any current business-model hints.
2. **Generate strategies** — the AI produces a ranked set of monetization plays: pricing
   model, packaging/tiers, primary and secondary revenue streams.
3. **Understand the rationale** — each play carries why it fits this company, key risks,
   and the conditions under which it works.
4. **Plan validation** — each play comes with concrete experiments and signals to watch
   so the team can test cheaply before committing.
5. **Compare & revisit** — save analyses per company and compare plays across the portfolio.

**The verified operation** this product exists to perform: *a monetization strategy set
generated for a company* — a company profile submitted and a ranked, reasoned set of
revenue plays produced.

## Positioning

Not a generic "ask the chatbot" wrapper and not a static template library. It is a
purpose-built monetization strategist: it asks the right questions for seed-stage tech,
reasons about fit, and outputs testable plays — replacing hours of consultant time or a
blank-page brainstorm with a structured, defensible starting point.

## Tone & brand

Sharp, credible, advisor-grade. Speaks the language of founders and investors — pricing,
packaging, revenue models, GTM — without fluff. Calm and confident, not hypey. Outputs
read like a strong analyst memo, not marketing copy.

## Scope

**In scope (initial):** company-profile input; AI-generated ranked monetization plays
with rationale, risks, and fit; suggested validation experiments; saving and comparing
analyses across companies.

**Out of scope (initial):** live financial modeling / cap-table math, automated market
data ingestion, CRM integrations, fundraising deck generation. These are candidate
future features, not part of the first build.

## Strategic principles

- **Testable over clever** — every play ships with a way to validate it cheaply.
- **Fit before volume** — rank by fit to this specific company, not by generic popularity.
- **Reasoned, not asserted** — always show the "why," so the user can defend the play.
- **Multi-company by design** — built for someone evaluating many companies over time.

## Volume assumptions (editable — not measured facts)

Used only to project impact until real usage data exists:

- An active user analyzes **~5 companies per week** (assumption — adjust to actual usage).
- Each generated strategy set replaces **~3 hours** of manual research/brainstorming
  (assumption — adjust to the user's own benchmark).
