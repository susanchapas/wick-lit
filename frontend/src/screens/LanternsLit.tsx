import { Button, ButtonLink } from "../components/Button";
import { EmptyState } from "../components/Feedback";
import { PageHead } from "../components/PageHead";
import { LanternTile, StreakCard } from "../components/Streak";
import { streak, useHistory } from "../lib/history";
import { growthRankForScore } from "../lib/rankings";

const short = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
const long = (d: Date) => d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

async function viewCertificate() {
  const win = window.open();
  if (!win) return;
  const template = await fetch("/files/wick-certificate%20(2).html").then((r) => r.text());
  win.document.write(template.replace("[Recipient Name]", "Neta R.").replace("[Completion date]", "Oct 4, 2026"));
  win.document.close();
}

export function Journey() {
  const history = useHistory();
  const { days, recent } = streak(history);

  return (
    <>
      <title>Journey · Wick</title>
      <PageHead
        overline="Journey"
        title="See how your practice grows"
        lead="A private record of completed trails, feedback ranks, and the progress you are building over time."
      />
      {history.length ? (
        <>
          <StreakCard
            count={days.length}
            aside={`${days.length} ${days.length === 1 ? "day" : "days"} lit · 1 session / day`}
            days={recent.map((d) => ({ label: short(d.date), name: long(d.date), lit: d.lit, today: d.today }))}
            action={
              <Button tone="lantern" onClick={viewCertificate}>
                View Certificate
              </Button>
            }
          >
            <p className="muted prose">
              Finish one session a day to keep your flame lit. Extra sessions on the same day do not add to your streak, and sessions you step out of do not count.
              {days.length === 0 && " Light it again tonight."}
            </p>
          </StreakCard>
          <ul className="lantern-grid">
            {history.map((l) => (
              <li key={l.id}>
                <LanternTile
                  title={l.title}
                  date={short(new Date(l.completedAt))}
                  score={l.score}
                  rank={typeof l.score === "number" ? growthRankForScore(l.score) : undefined}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EmptyState
          title="Your journey starts here."
          aside="Your first growth stage appears after a completed trail."
          action={
            <ButtonLink tone="lantern" to="/trails">
              Find a trail
            </ButtonLink>
          }
        >
          Finish a trail to save your first result and growth rank.
        </EmptyState>
      )}
    </>
  );
}
