import type { ReactNode } from "react";
import { streak, useHistory } from "../lib/history";
import { growthRanks, type GrowthRank } from "../lib/rankings";
import { withPeriod } from "../lib/text";
import { ButtonLink } from "./Button";

interface Day {
  label: string;
  name: string;
  lit: boolean;
  today?: boolean;
}

interface StreakCardProps {
  count: number;
  days: Day[];
  aside: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}

export function StreakCard({ count, days, aside, children, action }: StreakCardProps) {
  return (
    <section className="wk-card panel streak" aria-labelledby="streak-title">
      <div className="panel__head">
        <div className="section">
          <p className="overline eyebrow">Candle streak</p>
          <h2 id="streak-title" className="heading">
            {withPeriod(count > 0 ? `${count}-day flame` : "Your wick is ready when you are.")}
          </h2>
        </div>
        <p className="data muted streak__aside">{aside}</p>
      </div>
      {children}
      <div className="streak__foot">
        <ul className="wk-week streak__days">
          {days.map((d) => (
            <li key={d.name}>
              <span className={`wk-week__dot${d.lit ? " is-lit" : ""}${d.today ? " is-today" : ""}`} aria-hidden="true" />
              <span aria-hidden="true">{d.label}</span>
              <span className="wk-sr">
                {d.name}: {d.lit ? "practiced" : "not practiced"}
              </span>
            </li>
          ))}
        </ul>
        {action}
      </div>
    </section>
  );
}

export function PracticeStreak({ action }: { action?: ReactNode }) {
  const { days, week, litToday } = streak(useHistory());
  return (
    <StreakCard
      count={days.length}
      aside="1 session / day"
      action={action}
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
  );
}

interface LanternTileProps {
  title: string;
  date: string;
  rank?: GrowthRank;
  score?: number;
  retryTo?: string;
}

export function LanternTile({ title, date, rank, score, retryTo }: LanternTileProps) {
  return (
    <article className="wk-lantern is-lit">
      <img
        className={`wk-lantern__rank-art${rank ? "" : " is-placeholder"}`}
        src={rank?.image ?? growthRanks[0].image}
        alt=""
      />
      <span className="wk-card__lit">{rank ? rank.name : "Rank not recorded"}</span>
      <h3 className="wk-lantern__title">{title}</h3>
      <p className="wk-lantern__meta">{date}{typeof score === "number" ? ` · ${score}/9` : " · Legacy session"}</p>
      {retryTo && (
        <div className="wk-lantern__retry">
          <ButtonLink tone="lantern" icon="replay" to={retryTo} aria-label={`Try ${title} again`}>
            Try Again?
          </ButtonLink>
        </div>
      )}
    </article>
  );
}
