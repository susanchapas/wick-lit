import { useScenarios } from "../lib/useScenarios";
import { Button } from "./Button";
import { Notice, Skeleton } from "./Feedback";
import { TrailCard } from "./TrailCard";

export function TrailList({ limit, featureFirst }: { limit?: number; featureFirst?: boolean }) {
  const { data, error, retry } = useScenarios();

  if (error)
    return (
      <Notice tone="danger" title="Trails did not load." action={<Button onClick={retry}>Try again</Button>}>
        Check your connection, then try again.
      </Notice>
    );

  return (
    <ul className="trail-grid" aria-busy={!data}>
      {data
        ? data.slice(0, limit).map((s, i) => (
            <li key={s.id}>
              <TrailCard scenario={s} index={i} featured={featureFirst && i === 0} />
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
