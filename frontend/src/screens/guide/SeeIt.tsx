import { Link } from "react-router";
import { Icon } from "../../components/Icon";
import type { StrategyInfo } from "../../lib/strategies";
import type { Scenario } from "../../lib/types";
import { Activity } from "./Activity";

interface SeeItProps {
  d: StrategyInfo;
  done: boolean;
  trails: Scenario[];
}

export function SeeIt({ d, done, trails }: SeeItProps) {
  return (
    <Activity id={`${d.id}-see`} n={2} title="See it" done={done}>
      <p className="muted">{d.meaning}. Here is how it can look in different places.</p>
      <ul className="guide-lines">
        {d.scenes.map((s, i) => (
          <li key={s.text} style={{ animationDelay: `${i * 40}ms` }}>
            <span className="guide-lines__where">{s.where}</span>
            {s.text}
          </li>
        ))}
      </ul>
      {trails.length > 0 && (
        <div className="guide-trails">
          <h4 className="guide-when">Try {d.name} on a trail</h4>
          <ul className="guide-trails__list">
            {trails.map((t) => (
              <li key={t.id}>
                <Link to={`/trails/${t.id}`} className="guide-trail">
                  <Icon name="trail" size={20} />
                  <span>
                    {t.title}
                    <small>{t.location}</small>
                  </span>
                  <Icon name="arrow" size={20} className="guide-trail__arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Activity>
  );
}
