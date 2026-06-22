import { Link } from "react-router";
import { ArrowLeft, Users } from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { Masthead } from "~/components/monetize/masthead";
import type {
  TFirmPage,
  TFirmPoint,
  TFirmTeamGroup,
} from "~/modules/configurables/src/constants/configurables.default";

const FALLBACK: TFirmPage = {
  navLabel: "About Square Peg",
  eyebrow: "The Firm",
  heading: "About Square Peg",
  intro:
    "Founded in 2012, Square Peg is built on a simple belief: that founders from our corner of the world — Australia, Israel, and Southeast Asia — will shape the future.",
  thesisHeading: "Our thesis",
  thesisPoints: [],
  processHeading: "How we work",
  processPoints: [],
  teamHeading: "Our team",
  teamGroups: [],
};

function PointGrid({ points }: { points: TFirmPoint[] }) {
  if (!points.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {points.map((point) => (
        <div
          key={point.title}
          className="rounded-lg border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold tracking-tight text-card-foreground">
            {point.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {point.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function TeamGrid({ groups }: { groups: TFirmTeamGroup[] }) {
  if (!groups.length) return null;
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.group}>
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.group}
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.members.map((member) => (
              <div
                key={member.name}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="text-sm font-semibold tracking-tight text-card-foreground">
                  {member.name}
                </p>
                {member.title ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {member.title}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FirmPage() {
  const { config } = useConfigurables();
  const firm = config?.firmPage ?? FALLBACK;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Masthead />

      <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to workspace
        </Link>

        <section className="mb-12 max-w-2xl space-y-3">
          {firm.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {firm.eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {firm.heading}
          </h1>
          {firm.intro ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              {firm.intro}
            </p>
          ) : null}
        </section>

        <section className="mb-12 space-y-5">
          <h2 className="border-b border-border pb-3 text-lg font-semibold tracking-tight">
            {firm.thesisHeading}
          </h2>
          <PointGrid points={firm.thesisPoints ?? []} />
        </section>

        <section className="mb-12 space-y-5">
          <h2 className="border-b border-border pb-3 text-lg font-semibold tracking-tight">
            {firm.processHeading}
          </h2>
          <PointGrid points={firm.processPoints ?? []} />
        </section>

        <section className="space-y-6">
          <h2 className="border-b border-border pb-3 text-lg font-semibold tracking-tight">
            {firm.teamHeading}
          </h2>
          <TeamGrid groups={firm.teamGroups ?? []} />
        </section>
      </main>
    </div>
  );
}
