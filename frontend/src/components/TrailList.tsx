import { useHistory } from "../lib/history";
import type { Scenario } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { Button } from "./Button";
import { Notice, Skeleton } from "./Feedback";
import { TrailCard } from "./TrailCard";

interface TrailListProps {
  limit?: number;
  featureFirst?: boolean;
  filter?: (s: Scenario) => boolean;
}

export function TrailList({ limit, featureFirst, filter = () => true }: TrailListProps) {
  const { data, error, retry } = useScenarios();
  const done = new Set(useHistory().map((h) => h.scenarioId));

  if (error)
    return (
      <Notice tone="danger" title="Trails did not load." action={<Button onClick={retry}>Try again</Button>}>
        Check your connection, then try again.
      </Notice>
    );

  return (
    <ul className="trail-grid" aria-busy={!data}>
      {data
        ? data
            .map((s, i) => ({ s, i }))
            .filter(({ s }) => filter(s))
            .slice(0, limit)
            .map(({ s, i }) => (
              <li key={s.id}>
                <TrailCard scenario={s} index={i} featured={featureFirst && i === 0} lit={done.has(s.id)} />
              </li>
            ))
        : Array.from({ length: limit ?? 4 }, (_, i) => (
            <li key={i}>
              <Skeleton />
            </li>
          ))}
      {!data && (
        <li className="wk-sr" role="status">
          Loading trails
        </li>
      )}
    </ul>
  );
}
