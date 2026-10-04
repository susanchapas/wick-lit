import { Link } from "react-router";
import type { Scenario } from "../lib/types";
import { Icon } from "./Icon";

interface TrailCardProps {
  scenario: Scenario;
  index: number;
  featured?: boolean;
  headingLevel?: 2 | 3;
  lit?: boolean;
}

export function TrailCard({ scenario: s, index, featured, headingLevel = 3, lit }: TrailCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={`wk-card wk-card--link wk-ornate${featured ? " wk-ornate-gilded" : ""}`}>
      <span className="wk-band wk-band--gold" aria-hidden="true" />
      <span className="wk-glint" aria-hidden="true" />
      <p className="wk-card__over">
        <span className="wk-card__time">Trail {String(index + 1).padStart(2, "0")}</span>
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
      </p>
      <p className="wk-card__note">
        <Icon name="info" size={20} />
        <span>Content note: {s.contentTags.join(", ").toLowerCase()}</span>
      </p>
      {lit && <span className="pill pill--lantern wk-card__done">Practiced</span>}
    </article>
  );
}
