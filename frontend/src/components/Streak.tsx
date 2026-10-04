import type { ReactNode } from "react";
import { growthRanks, type GrowthRank } from "../lib/rankings";
import { withPeriod } from "../lib/text";

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
}

export function StreakCard({ count, days, aside, children }: StreakCardProps) {
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
      <img
        className={`wk-lantern__rank-art${rank ? "" : " is-placeholder"}`}
        src={rank?.image ?? growthRanks[0].image}
        alt=""
      />
      <span className="wk-card__lit">{rank ? rank.name : "Rank not recorded"}</span>
      <h3 className="wk-lantern__title">{withPeriod(title)}</h3>
      <p className="wk-lantern__meta">{date}{typeof score === "number" ? ` · ${score}/9` : " · Legacy session"}</p>
    </article>
  );
}
