import { useParams } from "react-router";
import { Button, ButtonLink } from "../components/Button";
import { Notice, Skeleton } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { SessionBar } from "../components/SessionBar";
import { useSettings } from "../lib/settings";
import { useScenarios } from "../lib/useScenarios";

export function ContentNote() {
  const { id } = useParams();
  const { data, error, retry } = useScenarios();
  const { captions, input } = useSettings();
  const s = data?.find((t) => t.id === id);

  return (
    <div className="session">
      <SessionBar exitTo="/trails" />
      <main className="cnote-screen">
        {s ? (
          <>
            <article className="wk-cnote">
              <title>{`Content note: ${s.title} · Wick`}</title>
              <h1 className="wk-cnote__title">{s.title}</h1>
              <Notice tone="caution" title={s.contentTags.join(", ")}>
                {s.contentNote}
              </Notice>
              <p className="wk-cnote__lead">{s.setup}</p>
              <div className="actions">
                <ButtonLink tone="lantern" size="lg" icon={input === "voice" ? "mic" : "direct"} to={`/trails/${s.id}/clearing`}>
                  Start role-play
                </ButtonLink>
                <ButtonLink tone="quiet" to="/trails">
                  Choose another trail
                </ButtonLink>
              </div>
            </article>
            <p className="wk-cnote__exit">
              <Icon name="step-out" size={20} />
              <span>
                You can step out at any moment. Stepping out ends the session without evaluation. Captions are {captions ? "on" : "off"}.{" "}
                {input === "voice" ? "You can type instead." : "You will type your replies."} Voice audio is transcribed for your turn and
                is not stored by Wick.
              </span>
            </p>
          </>
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
