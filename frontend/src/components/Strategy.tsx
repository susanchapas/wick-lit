import { strategy } from "../lib/strategies";
import type { StrategyNumber } from "../lib/types";

export function Strategy({ n, plain }: { n: StrategyNumber; plain?: boolean }) {
  const d = strategy(n);
  return (
    <span className={`wk-d wk-d--${d.id}${plain ? " wk-d--plain" : ""}`}>
      <span className="wk-d__badge" aria-hidden="true">
        {d.n}
      </span>
      {d.name}
    </span>
  );
}
