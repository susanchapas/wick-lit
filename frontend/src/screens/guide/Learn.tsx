import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import type { StrategyInfo } from "../../lib/strategies";
import { Activity } from "./Activity";

interface LearnProps {
  d: StrategyInfo;
  done: boolean;
  onNext?: () => void;
}

export function Learn({ d, done, onNext }: LearnProps) {
  return (
    <Activity id={`${d.id}-learn`} n={1} title="Learn" done={done}>
      <p className="aside prose">{d.definition}</p>
      <div className="guide-about prose">
        {d.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="guide-grid">
        <div className="well well--yes">
          <h4 className="icon-row guide-when">
            <Icon name="check" size={20} />
            Use it when
          </h4>
          <p>{d.when}</p>
        </div>
        <div className="well well--no">
          <h4 className="icon-row guide-when">
            <Icon name="caution" size={20} />
            Hold back when
          </h4>
          <p>{d.whenNot}</p>
        </div>
      </div>
      <div className="guide-tips">
        <h4 className="guide-when">Do it well</h4>
        <ul className="bullets prose">
          {d.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <p className="caption muted">
        The five Ds come from{" "}
        <a href="https://righttobe.org/guides/bystander-intervention-training/" target="_blank" rel="noreferrer">
          Right To Be’s bystander intervention guide
        </a>
        .
      </p>
      {onNext && (
        <Button className="self-start" iconAfter="arrow" onClick={onNext}>
          See examples
        </Button>
      )}
    </Activity>
  );
}
