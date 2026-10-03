import { Link } from "react-router";
import type { Scenario } from "../lib/types";
import { Icon } from "./Icon";
import { Strategy } from "./Strategy";

const bands: Record<string, string> = {
  "House party": "lantern",
  Bar: "lantern",
  "Group chat": "arcane",
  "Campus library": "moss",
  Train: "gold",
};

interface TrailCardProps {
  scenario: Scenario;
  index: number;
  featured?: boolean;
  headingLevel?: 2 | 3;
}

export function TrailCard({ scenario: s, index, featured, headingLevel = 3 }: TrailCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={`wk-card wk-card--link wk-ornate${featured ? " wk-ornate-gilded" : ""}`}>
      <span className={`wk-band wk-band--${bands[s.location] ?? "moss"}`} aria-hidden="true" />
      <p className="wk-card__over">
        Trail {String(index + 1).padStart(2, "0")} · {s.location}
      </p>
      <Heading className="wk-card__title">
        <Link to={`/trails/${s.id}`}>{s.title}</Link>
      </Heading>
      <p className="wk-card__body">{s.setup}</p>
      <p className="wk-card__meta">
        <span>
          <Icon name="timer" size={20} />
          About {s.minutes} min
        </span>
        <span>{s.characters.join(", ")}</span>
      </p>
      <p className="wk-card__note">
        <Icon name="info" size={20} />
        <span>Content note: {s.contentTags.join(", ").toLowerCase()}</span>
      </p>
      <ul className="wk-card__ds" aria-label="Strategies">
        {s.strategies.map((n) => (
          <li key={n}>
            <Strategy n={n} />
          </li>
        ))}
      </ul>
      <div className="wk-card__foot" aria-hidden="true">
        <span className="wk-card__go">
          Read the content note
          <Icon name="arrow" size={20} />
        </span>
      </div>
    </article>
  );
}
