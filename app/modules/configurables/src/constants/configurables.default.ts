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

export type TFirmTeamMember = {
  name: string;
  title?: string;
};

export type TFirmTeamGroup = {
  group: string;
  members: TFirmTeamMember[];
};

export type TFirmPoint = {
  title: string;
  body: string;
};

export type TFirmPage = {
  navLabel: string;
  eyebrow: string;
  heading: string;
  intro: string;
  thesisHeading: string;
  thesisPoints: TFirmPoint[];
  processHeading: string;
  processPoints: TFirmPoint[];
  teamHeading: string;
  teamGroups: TFirmTeamGroup[];
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
  // Firm page content
  firmPage?: TFirmPage;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "MonetizeMaxxing",
  logoUrl:
    "https://client-api.quantumbyte.ai/uploads/ats0u7ho/4805/assets/27c76cd3-2d84-4def-abdc-dfced7323ed0_1782172536079_mrzwb2.png",
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
  firmPage: {
    navLabel: "About Square Peg",
    eyebrow: "The Firm",
    heading: "About Square Peg",
    intro:
      "Founded in 2012, Square Peg is built on a simple belief: that founders from our corner of the world — Australia, Israel, and Southeast Asia — will shape the future. A generalist technology investor with founders at the center.",
    thesisHeading: "Our thesis",
    thesisPoints: [
      {
        title: "Founders at the center",
        body: "A generalist technology investor that backs founders from our corner of the world — Australia, Israel, and Southeast Asia — in the belief that they will shape the future.",
      },
      {
        title: "Hyper-scale and defensibility",
        body: "We look for hyper-scale potential paired with defensibility — products customers choose for their inherent value.",
      },
      {
        title: "Where we go deep",
        body: "Sector strengths span AI infrastructure and applications, B2B SaaS, and fintech, alongside edtech and climate tech.",
      },
      {
        title: "Stage and ownership",
        body: "Our core fund (Fund 4) invests from Seed to Series B, while the Opportunities Fund backs later-stage emerging winners. We typically target ~10–20% ownership and manage $3.25B+ in AUM (as of December 2024).",
      },
    ],
    processHeading: "How we work",
    processPoints: [
      {
        title: "People-first",
        body: "We back founders with a compelling vision who are surrounded by talented, mission-driven people.",
      },
      {
        title: "Concentrated and committed",
        body: "We concentrate on a handful of new founders each year and invest repeatedly — an average of about three investments per portfolio company — supporting founders the whole way.",
      },
      {
        title: "A conversation, not a pitch",
        body: "Our meetings are more a conversation, less a pitch.",
      },
      {
        title: "Local partners, global reach",
        body: "We bring a long-term mindset over short-term equity: local partners with global reach.",
      },
    ],
    teamHeading: "Our team",
    teamGroups: [
      {
        group: "Partners",
        members: [
          { name: "Paul Bassat", title: "Co-Founder & Partner" },
          { name: "Tony Holt", title: "Co-Founder & Partner" },
          { name: "Dan Krasnostein", title: "Partner" },
          { name: "Tushar Roy", title: "Partner" },
          { name: "Piruze Sabuncu", title: "Partner" },
          { name: "Philippe Schwartz", title: "Partner" },
          { name: "Yonatan Sela", title: "Partner" },
        ],
      },
      {
        group: "Principals",
        members: [
          { name: "Ed Barker" },
          { name: "Jethro Cohen" },
          { name: "Jun Wei Tan" },
        ],
      },
      {
        group: "Co-founders",
        members: [
          { name: "Barry Brott" },
          { name: "Justin Liberman" },
        ],
      },
      {
        group: "Operations & IR",
        members: [
          { name: "Leila Lee", title: "Partner & Head of Distribution" },
          { name: "Amanda Hjorring", title: "Partner & COO" },
          { name: "Luke Stevens", title: "CFO" },
        ],
      },
    ],
  },
};
