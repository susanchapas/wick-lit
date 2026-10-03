import { Link } from "react-router";
import { Scenery } from "../components/Brand";
import { Button } from "../components/Button";
import { Notice, Skeleton } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/PageHead";
import { StreakCard } from "../components/Streak";
import { streak, useHistory } from "../lib/history";
import { useScenarios } from "../lib/useScenarios";

const pins = [
  [22, 40],
  [70, 30],
  [86, 58],
  [54, 62],
  [34, 70],
  [90, 22],
  [12, 60],
  [46, 24],
];

export function Grove() {
  const history = useHistory();
  const { data, error, retry } = useScenarios();
  const { days, week, litToday } = streak(history);
  const done = new Set(history.map((h) => h.scenarioId));

  return (
    <>
      <title>The grove · Wick</title>
      <PageHead
        overline="The grove"
        title="Keep your wick lit"
        lead="A short practice is here when you are ready."
        aside={
          <>
            <Link to="/settings" className="wk-btn wk-btn--frost wk-btn--icon only-phone" aria-label="Settings">
              <Icon name="settings" />
            </Link>
          </>
        }
      />
      <StreakCard
        count={days.length}
        aside="1 session / day"
        days={week.map((d) => ({
          label: d.date.toLocaleDateString(undefined, { weekday: "short" }),
          name: d.date.toLocaleDateString(undefined, { weekday: "long" }),
          lit: d.lit,
          today: d.today,
        }))}
      >
        <p className="muted prose">
          One completed session per day keeps it lit.
          {litToday ? " Today’s session is done." : " Light it again tonight to keep your streak going."}
        </p>
      </StreakCard>
      <section className="section" aria-labelledby="map-title">
        <div className="section">
          <p className="overline eyebrow">Grove map</p>
          <h2 id="map-title" className="heading">
            Trailheads for tonight
          </h2>
          <p className="muted">Choose a trailhead to read its content note and start your practice.</p>
        </div>
        <div className="wk-card panel map">
          <ul className="map__legend caption muted" aria-hidden="true">
            <li>
              <span className="map__dot" />
              Trailhead
            </li>
            <li>
              <Icon name="flame" size={20} />
              Lantern lit
            </li>
          </ul>
          {error ? (
            <Notice tone="danger" title="Trails did not load." action={<Button onClick={retry}>Try again</Button>}>
              Check your connection, then try again.
            </Notice>
          ) : data ? (
            <div className="map__ground">
              <Scenery height={140} />
              <ol className="map__pins">
                {data.map((s, i) => {
                  const [x, y] = pins[i % pins.length];
                  return (
                    <li key={s.id} style={{ left: `${x}%`, top: `${y}%` }}>
                      <Link to={`/trails/${s.id}`} className={done.has(s.id) ? "pin is-lit" : "pin"}>
                        <span className="pin__num" aria-hidden="true">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="pin__label">
                          {s.location}
                          {done.has(s.id) && <Icon name="flame" size={20} />}
                        </span>
                        <span className="pin__title">{s.title}</span>
                        {done.has(s.id) && <span className="wk-sr">, lantern lit</span>}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : (
            <Skeleton />
          )}
        </div>
      </section>
    </>
  );
}
