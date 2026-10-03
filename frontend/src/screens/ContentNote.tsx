import { useParams } from "react-router";
import { Button, ButtonLink } from "../components/Button";
import { Notice, Skeleton } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { Strategy } from "../components/Strategy";
import { useScenarios } from "../lib/useScenarios";

export function ContentNote() {
  const { id } = useParams();
  const { data, error, retry } = useScenarios();
  const s = data?.find((t) => t.id === id);

  return (
    <main className="cnote-screen">
      <ButtonLink tone="exit" icon="step-out" to="/trails" className="step-out">
        Step out
      </ButtonLink>
      {s ? (
        <article className="wk-cnote">
          <title>{`Content note: ${s.title} · Wick`}</title>
          <p className="overline muted">Content note</p>
          <h1 className="wk-cnote__title">{s.title}</h1>
          <p className="wk-cnote__lead">{s.setup}</p>
          <h2 className="label">This trail includes</h2>
          <ul className="wk-cnote__list">
            {s.contentTags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p>{s.contentNote}</p>
          <p className="caption muted">
            About {s.minutes} min · {s.location} · {s.characters.join(", ")}
          </p>
          <ul className="wk-card__ds" aria-label="Strategies you can practice">
            {s.strategies.map((n) => (
              <li key={n}>
                <Strategy n={n} />
              </li>
            ))}
          </ul>
          <div className="actions">
            <ButtonLink tone="lantern" size="lg" icon="mic" to={`/trails/${s.id}/clearing`}>
              Start role-play
            </ButtonLink>
            <ButtonLink tone="quiet" to="/trails">
              Choose another trail
            </ButtonLink>
          </div>
          <p className="wk-cnote__exit">
            <Icon name="step-out" size={20} />
            You can step out at any moment. Nothing is saved unless you finish.
          </p>
        </article>
      ) : error ? (
        <Notice tone="danger" title="This trail did not load." action={<Button onClick={retry}>Try again</Button>}>
          Check your connection, then try again.
        </Notice>
      ) : data ? (
        <Notice tone="info" title="We could not find this trail." action={<ButtonLink to="/trails">Choose a trail</ButtonLink>} />
      ) : (
        <div className="wk-cnote" aria-busy="true">
          <h1 className="wk-sr">Loading content note</h1>
          <Skeleton />
        </div>
      )}
    </main>
  );
}
