import { Icon } from "../../components/Icon";
import { guideSteps, pexels, strategies } from "../../lib/strategies";

const about = [
  "A short definition, when to use it, and when to hold back.",
  "Plain examples of what it can sound like in everyday places.",
  "Three quick rounds: spot the response that fits.",
  "Write one short line you could say yourself.",
];

interface OverviewProps {
  steps: number[];
  isOpen: (i: number) => boolean;
  labelledBy: string;
  onGo: (i: number) => void;
}

export function Overview({ steps, isOpen, labelledBy, onGo }: OverviewProps) {
  const total = guideSteps.length;
  const done = steps.filter((s) => s === total).length;

  return (
    <div className="guide-module" id="guide-panel" role="tabpanel" aria-labelledby={labelledBy}>
      <section className="guide-head" aria-labelledby="overview-intro">
        <figure className="guide-photo">
          <img src={pexels(6140655)} alt="" width={960} height={600} />
        </figure>
        <div className="guide-head__body">
          <h2 className="heading" id="overview-intro">
            Five ways to step in
          </h2>
          <p className="aside prose">
            When you see harm, you can respond in five ways. Each D fits a different situation, and each one lets you
            help while you stay safe.
          </p>
          <div className="guide-overview__progress">
            <p className="muted">
              {done} of {strategies.length} done
            </p>
            <span className="guide-tile__bar guide-overview__bar" aria-hidden="true">
              <i style={{ width: `${(done / strategies.length) * 100}%` }} />
            </span>
          </div>
        </div>
      </section>

      <section className="wk-card guide-act" aria-labelledby="overview-steps">
        <h3 className="aside" id="overview-steps">
          How each lesson works
        </h3>
        <p className="muted prose">Each D takes about a minute. Finish one to open practice for the next.</p>
        <ol className="guide-lines">
          {guideSteps.map((s, i) => (
            <li key={s}>
              <span className="guide-lines__where">
                {String(i + 1).padStart(2, "0")} · {s}
              </span>
              {about[i]}
            </li>
          ))}
        </ol>
      </section>

      <section className="wk-card guide-act" aria-labelledby="overview-ds">
        <h3 className="aside" id="overview-ds">
          The five Ds
        </h3>
        <ul className="guide-trails__list">
          {strategies.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={`guide-trail wk-d--${s.id}`}
                aria-disabled={!isOpen(i)}
                onClick={() => onGo(i)}
              >
                <Icon name={isOpen(i) ? s.id : "lock"} className="guide-overview__icon" />
                <span>
                  {s.name}
                  <small>{s.meaning}</small>
                </span>
                <small>{!isOpen(i) ? "Locked" : steps[i] === total ? "Done" : `${(steps[i] / total) * 100}%`}</small>
                <Icon name="arrow" className="guide-trail__arrow" />
              </button>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
