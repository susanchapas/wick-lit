import { guideSteps } from "../../lib/strategies";

export function StepTrail({ step, label }: { step: number; label: string }) {
  return (
    <ol className="steptrail" aria-label={label}>
      {guideSteps.map((s, i) => (
        <li key={s} data-lit={i < step || undefined}>
          <span className="steptrail__star" aria-hidden="true" />
          {s}
          {i < step && <span className="wk-sr">, done</span>}
        </li>
      ))}
    </ol>
  );
}
