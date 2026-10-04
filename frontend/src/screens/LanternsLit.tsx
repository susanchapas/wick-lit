import { Button, ButtonLink } from "../components/Button";
import { EmptyState } from "../components/Feedback";
import { PageHead } from "../components/PageHead";
import { LanternTile, StreakCard } from "../components/Streak";
import { streak, useHistory } from "../lib/history";

const short = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
const long = (d: Date) => d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

async function viewCertificate() {
  const win = window.open();
  if (!win) return;
  const template = await fetch("/files/wick-certificate%20(2).html").then((r) => r.text());
  win.document.write(template.replace("[Recipient Name]", "Neta R.").replace("[Completion date]", "Oct 4, 2026"));
  win.document.close();
}

export function LanternsLit() {
  const history = useHistory();
  const { days } = streak(history);

  return (
    <>
      <title>Lanterns lit · Wick</title>
      <PageHead
        overline="Lanterns lit"
        title="Practice you completed"
        lead="A quiet record of showing up. Completion never publishes a score."
        aside={
          history.length > 0 && (
            <Button tone="lantern" onClick={viewCertificate}>
              View Certificate
            </Button>
          )
        }
      />
      {history.length ? (
        <>
          <StreakCard
            count={days.length}
            aside={`${days.length} ${days.length === 1 ? "day" : "days"} lit · 1 session / day`}
            days={days.map((d) => ({ label: short(d), name: long(d), lit: true }))}
          >
            <p className="muted prose">
              One completed session per day keeps it lit. Step-outs do not count, and only one streak day counts per day.
              {days.length === 0 && " Light it again tonight."}
            </p>
          </StreakCard>
          <ul className="lantern-grid">
            {history.map((l) => (
              <li key={l.id}>
                <LanternTile title={l.title} meta={l.strategies.join(" · ")} date={short(new Date(l.completedAt))} />
              </li>
            ))}
          </ul>
          <p className="caption muted">Only you can see this browser history. Voice audio is transcribed and not stored.</p>
        </>
      ) : (
        <EmptyState
          title="No lanterns lit yet."
          aside="Your wick is ready when you are."
          action={
            <ButtonLink tone="lantern" to="/trails">
              Find a trail
            </ButtonLink>
          }
        >
          Finish a trail to light your first lantern.
        </EmptyState>
      )}
    </>
  );
}
