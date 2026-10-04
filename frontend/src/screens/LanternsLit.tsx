import { Button, ButtonLink } from "../components/Button";
import { EmptyState } from "../components/Feedback";
import { PageHead } from "../components/PageHead";
import { LanternTile, PracticeStreak } from "../components/Streak";
import { useHistory } from "../lib/history";
import { growthRankForScore } from "../lib/rankings";

const short = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

async function viewCertificate() {
  const win = window.open();
  if (!win) return;
  const template = await fetch("/files/wick-certificate%20(2).html").then((r) => r.text());
  win.document.write(template.replace("[Recipient Name]", "Tessa K.").replace("[Completion date]", "Oct 4, 2026"));
  win.document.close();
}

export function Journey() {
  const history = useHistory();

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
          <PracticeStreak
            action={
              <Button tone="lantern" onClick={viewCertificate}>
                View Certificate
              </Button>
            }
          />
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
          action={
            <ButtonLink tone="lantern" to="/trails">
              Find a trail
            </ButtonLink>
          }
        >
          Complete a trail to see your first result and growth rank.
        </EmptyState>
      )}
    </>
  );
}
