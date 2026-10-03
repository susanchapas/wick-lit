import { Link } from "react-router";
import { Button } from "../components/Button";
import { Notice, Skeleton } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/PageHead";
import { StreakCard } from "../components/Streak";
import { streak, useHistory } from "../lib/history";
import { useScenarios } from "../lib/useScenarios";

const pins = [
  [26, 23],
  [74, 23],
  [10, 48],
  [51, 45],
  [92, 30],
  [30, 65],
  [48, 75],
  [78, 79],
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
            Trailheads for tonight.
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
