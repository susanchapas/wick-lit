import { ButtonLink } from "../components/Button";
import { Notice } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/PageHead";
import { Strategy } from "../components/Strategy";
import { strategies } from "../lib/strategies";
import { useScenarios } from "../lib/useScenarios";

export function FieldGuide() {
  const { data } = useScenarios();
  const trailFor = (n: number) => data?.find((s) => s.strategies[0] === n) ?? data?.find((s) => (s.strategies as number[]).includes(n));

  return (
    <>
      <title>Field guide · Wick</title>
      <PageHead
        overline="Field guide"
        title="The five Ds"
        lead="Five practical ways to step in. Choose based on safety, context, and what the person affected wants. Each strategy shows when to use it and when to choose another path."
      />
      <div className="section prose muted">
        <p>
          The five Ds are not a checklist to complete in order. They are a set of options to match to the situation, the
          people involved, and what feels safest in the moment.
        </p>
        <p>Use the guidance below to decide which strategy fits best, then practice it on a trail.</p>
      </div>
      <ol className="stack-list">
        {strategies.map((d) => {
          const trail = trailFor(d.n);
          return (
            <li key={d.id} className="wk-card panel">
              <h2 className="subtitle icon-row">
                <Strategy n={d.n} plain />
                <Icon name={d.id} size={20} className="muted" />
                <span className="wk-sr">: {d.meaning}</span>
              </h2>
              <p className="muted">{d.meaning}</p>
              <div className="guide-grid">
                <div className="well">
                  <h3 className="overline eyebrow">When to use</h3>
                  <p>{d.when}</p>
                </div>
                <div className="well">
                  <h3 className="overline eyebrow">When not to use</h3>
                  <p>{d.whenNot}</p>
                </div>
              </div>
              {trail && (
                <ButtonLink to={`/trails/${trail.id}`} icon="trail" className="self-start">
                  Practice this on a trail: “{trail.title}”
                </ButtonLink>
              )}
            </li>
          );
        })}
      </ol>
      <Notice tone="info" title="Follow the person’s lead.">
        Intervention is not about taking control away from someone. Make safety visible, offer choices, and follow the
        person’s lead when you can.
      </Notice>
      <ButtonLink tone="lantern" icon="trail" to="/trails" className="self-start">
        Choose a trail to practice
      </ButtonLink>
    </>
  );
}
