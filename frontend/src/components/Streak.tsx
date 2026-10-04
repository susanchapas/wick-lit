import type { ReactNode } from "react";
import type { GrowthRank } from "../lib/rankings";
import { withPeriod } from "../lib/text";

const flame = "M12 3C14.6 6.4 18 8.9 18 13.6A6 6 0 0 1 6 13.6C6 10.6 7.8 8.6 9.2 6.4C9.8 8.2 10.7 9.2 11.8 9.6C12.6 7.6 12.6 5.3 12 3Z";

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

interface LanternTileProps {
  title: string;
  date: string;
  rank?: GrowthRank;
  score?: number;
}

export function LanternTile({ title, date, rank, score }: LanternTileProps) {
  return (
    <article className="wk-lantern is-lit">
      {rank ? (
        <img className="wk-lantern__rank-art" src={rank.image} alt="" />
      ) : (
        <svg className="wk-lantern__flame" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={flame} />
        </svg>
      )}
      <span className="wk-card__lit">{rank ? rank.name : "Rank unavailable"}</span>
      <h3 className="wk-lantern__title">{withPeriod(title)}</h3>
      <p className="wk-lantern__meta">{date}{typeof score === "number" ? ` · ${score}/9` : ""}</p>
    </article>
  );
}
