import { useParams } from "react-router";
import { Button, ButtonLink } from "../components/Button";
import { Notice, Skeleton } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { SessionBar } from "../components/SessionBar";
import { Strategy } from "../components/Strategy";
import { useSettings } from "../lib/settings";
import { useScenarios } from "../lib/useScenarios";
import { withPeriod } from "../lib/text";

export function ContentNote() {
  const { id } = useParams();
  const { data, error, retry } = useScenarios();
  const { captions, input } = useSettings();
  const index = data?.findIndex((t) => t.id === id) ?? -1;
  const s = data?.[index];

  return (
    <div className="session">
      <SessionBar exitTo="/trails" />
      <main className="cnote-screen">
        {s ? (
          <article className="wk-cnote">
            <title>{`Content note: ${s.title} · Wick`}</title>
            <p className="overline eyebrow">Content note · Trail {String(index + 1).padStart(2, "0")}</p>
            <h1 className="wk-cnote__title">{withPeriod(s.title)}</h1>
            <Notice tone="caution" title={s.contentTags.join(", ")}>
              {s.contentNote}
            </Notice>
            <p className="wk-cnote__lead">{s.setup}</p>
            <h2 className="label">Session details.</h2>
            <ul className="chips">
              <li className="pill">About {s.minutes} min</li>
              <li className="pill">{s.location}</li>
              <li className="pill">{s.characters.join(", ")}</li>
            </ul>
            <h2 className="label">Fitting strategies.</h2>
            <ul className="wk-card__ds" aria-label="Strategies you can practice">
              {[...s.strategies].sort((a, b) => a - b).map((n) => (
                <li key={n}>
                  <Strategy n={n} />
                </li>
              ))}
            </ul>
            <p className="caption muted">
              Captions are {captions ? "on" : "off"}. {input === "voice" ? "You can type instead." : "You will type your replies."}{" "}
              Voice audio is transcribed for your turn and is not stored by Wick.
            </p>
            <div className="actions">
              <ButtonLink tone="lantern" size="lg" icon={input === "voice" ? "mic" : "direct"} to={`/trails/${s.id}/clearing`}>
                Start role-play
              </ButtonLink>
              <ButtonLink tone="quiet" to="/trails">
                Choose another trail
              </ButtonLink>
            </div>
            <p className="wk-cnote__exit">
              <Icon name="step-out" size={20} />
              You can step out at any moment. Stepping out ends the session without evaluation.
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
            <h1 className="wk-sr">Loading content note.</h1>
            <Skeleton />
          </div>
        )}
      </main>
    </div>
  );
}
