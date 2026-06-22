/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TStageOption = {
  id: string;
  label: string;
  hint?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  // App identity / copy
  tagline?: string;
  introHeadline?: string;
  introSubhead?: string;
  generateButtonLabel?: string;
  footerNote?: string;
  // Core engine config
  playsToGenerate?: number;
  sectors?: string[];
  stages?: TStageOption[];
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "MonetizeMaxxing",
  logoUrl: "",
  brandColor: {
    // Base — soft off-white canvas, deep ink text (analyst-memo aesthetic)
    background:        "#fafaf8",
    foreground:        "#11141a",
    // Card — clean white surfaces with subtle borders
    card:              "#ffffff",
    cardForeground:    "#11141a",
    // Popover
    popover:           "#ffffff",
    popoverForeground: "#11141a",
    // Primary — deep trustworthy emerald green
    primary:           "#0f5132",
    primaryForeground: "#f8faf9",
    // Secondary — quiet neutral
    secondary:           "#f1f1ec",
    secondaryForeground: "#11141a",
    // Muted — supporting metadata
    muted:           "#f1f1ec",
    mutedForeground: "#6b6f76",
    // Accent — soft green wash for emphasis
    accent:           "#e7f0ea",
    accentForeground: "#0f5132",
    // Destructive
    destructive:           "#b42318",
    destructiveForeground: "#fafafa",
    // Border / Input / Ring — subtle warm-gray borders
    border: "#e7e7e2",
    input:  "#e7e7e2",
    ring:   "#0f5132",
    // Charts
    chart1: "#0f5132",
    chart2: "#2f7d55",
    chart3: "#7ba893",
    chart4: "#c2a85a",
    chart5: "#11141a",
    // Navbar
    navbarBackground: "#fafaf8",
    // Sidebar
    sidebarBackground:        "#f1f1ec",
    sidebarForeground:        "#11141a",
    sidebarPrimary:           "#0f5132",
    sidebarPrimaryForeground: "#f8faf9",
    sidebarAccent:            "#e7f0ea",
    sidebarAccentForeground:  "#0f5132",
    sidebarBorder:            "#e7e7e2",
    sidebarRing:              "#0f5132",
  },
  font: {
    headingFont: "Space Grotesk",
    textFont: "Inter",
  },
  // App identity / copy
  tagline: "Stage-aware monetization strategy, in minutes.",
  introHeadline: "Pressure-test how a company makes money.",
  introSubhead:
    "Describe the company and its stage. Get a ranked shortlist of monetization plays — each with the why, the economics, and one experiment to validate it. Built to put in front of a founder or an investment committee.",
  generateButtonLabel: "Generate monetization plays",
  footerNote:
    "Outputs are AI-generated starting points, not investment advice. Pressure-test before presenting.",
  // Core engine config
  playsToGenerate: 4,
  sectors: [
    "SaaS / B2B Software",
    "Consumer / B2C",
    "Marketplace",
    "Fintech",
    "Healthtech",
    "Developer Tools / API",
    "AI / ML",
    "Hardware / Deeptech",
    "Climate / Energy",
    "Other",
  ],
  stages: [
    { id: "pre-revenue", label: "Pre-revenue", hint: "Building product, validating demand, no monetization yet" },
    { id: "early-traction", label: "Early traction", hint: "First paying customers, searching for repeatable revenue" },
    { id: "scaling", label: "Scaling", hint: "Proven model, focused on growth and expansion economics" },
  ],
};
