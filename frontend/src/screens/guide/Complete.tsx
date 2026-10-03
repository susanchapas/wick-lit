import { useEffect, useRef } from "react";
import { Mark } from "../../components/Brand";
import { Button, ButtonLink } from "../../components/Button";
import { burst } from "../../lib/effects";
import type { StrategyInfo } from "../../lib/strategies";
import type { Scenario } from "../../lib/types";

interface CompleteProps {
  d: StrategyInfo;
  next?: StrategyInfo;
  trail?: Scenario;
  celebrate: boolean;
  onNext?: () => void;
}

export function Complete({ d, next, trail, celebrate, onNext }: CompleteProps) {
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!celebrate || !mark.current) return;
    document.getElementById(`${d.id}-done`)?.focus();
    if (!next) burst(mark.current);
  }, [celebrate, d.id, next]);

  return (
    <section className="wk-card wk-ornate guide-done" aria-labelledby={`${d.id}-done`}>
      <div className="guide-done__mark" ref={mark}>
        <Mark size={64} live />
      </div>
      <h3 className="heading" id={`${d.id}-done`} tabIndex={-1}>
        {d.name} complete
      </h3>
      <p className="muted prose">{next ? `${next.name} is now open.` : "You have worked through all five Ds."}</p>
      <div className="actions center">
        {next && onNext && (
          <Button tone="lantern" iconAfter="arrow" onClick={onNext}>
            Go to {next.name}
          </Button>
        )}
        {trail && (
          <ButtonLink to={`/trails/${trail.id}`} tone="quiet" icon="trail">
            Practice on a trail: “{trail.title}”
          </ButtonLink>
        )}
      </div>
    </section>
  );
}
