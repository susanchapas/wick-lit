import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import { Embers } from "../components/Brand";
import { Button, ButtonLink } from "../components/Button";
import { Dialog, Meter, Notice } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { Transcript } from "../components/Session";
import { addLantern, setReflection, useHistory } from "../lib/history";
import { growthRankForScore } from "../lib/rankings";
import type { EvaluationDimension, WickSession } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { withPeriod } from "../lib/text";

interface ResultState { session: WickSession }
const statusValue = { insufficient_evidence: 0, not_demonstrated: 1, partly_demonstrated: 2, demonstrated: 3 } as const;
const statusLabel = (status: EvaluationDimension["status"]) => status.split("_").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
export function Result() {
  const { id = "" } = useParams();
  const state = useLocation().state as ResultState | null;
  const session = state?.session;
  const evaluation = session?.evaluation;
  const scenario = useScenarios().data?.find((candidate) => candidate.id === id);
  const [reflecting, setReflecting] = useState(false);
  const saved = useHistory().find((lantern) => lantern.id === session?.sessionId);
  const [note, setNote] = useState(saved?.reflection ?? "");

  const score = evaluation
    ? Object.values(evaluation.dimensions).reduce((sum, dimension) => sum + statusValue[dimension.status], 0)
    : undefined;

  useEffect(() => {
    if (!evaluation || !scenario || !session || score === undefined) return;
    addLantern({
      id: session.sessionId,
      scenarioId: session.scenarioId,
      title: scenario.title,
      strategies: evaluation.identifiedStrategies.map((strategy) => strategy.name),
      completedAt: session.endedAt ?? evaluation.metadata.evaluatedAt,
      score,
    });
  }, [evaluation, scenario, score, session]);

  if (!session) return <Navigate to={`/trails/${id}`} replace />;
  const retry = <ButtonLink tone="lantern" icon="replay" to={`/trails/${id}/clearing`}>Try again</ButtonLink>;
  const lines = session.turns.map((turn) => turn.role === "user"
    ? { role: "you" as const, text: turn.text }
    : { role: "ai" as const, speaker: scenario?.characterNames[turn.speaker] ?? turn.speaker, text: turn.text });

  if (!evaluation) return <><title>Coaching result · Wick</title><h1 className="title">Coaching result.</h1><Notice tone="danger" title="Feedback is unavailable for this session." action={retry}>Your backend transcript is preserved below.</Notice><Transcript label="Your conversation" lines={lines} /></>;

  const dimensions = [
    ["Clear action", evaluation.dimensions.clearAction],
    ["Safety", evaluation.dimensions.safety],
    ["Support and choice", evaluation.dimensions.supportAndChoice],
  ] as const;

  const rank = growthRankForScore(score ?? 0);

  return (
    <>
      <title>Coaching result · Wick</title>
      <header className="wk-score result-hero is-done">
        <div className="result-hero__art" aria-hidden="true"><img src={rank.image} alt="" /><Embers count={6} /></div>
        <div className="section">
          <h1 className="title result-hero__title">{rank.name}</h1>
          <p className="muted">{rank.explanation}</p>
          <p className="wk-score__band subtitle">{withPeriod(evaluation.summary)}</p>
          <p className="wk-score__summary">{evaluation.strength}</p>
          <div className="actions">{retry}<Button tone="bark" icon="document" onClick={() => setReflecting(true)}>{saved?.reflection ? "Edit reflection" : "Reflect"}</Button></div>
        </div>
      </header>
      <div className="result-split">
        <div className="result-dims">
          {dimensions.map(([name, dimension]) => (
            <details key={name} className="wk-card panel result-dim">
              <summary><Meter label={name} value={statusValue[dimension.status]} max={3} /><Icon name="chevron" size={20} /></summary>
              <p className="label">{statusLabel(dimension.status)}</p>
              <p>{dimension.rationale}</p>
              {dimension.evidence.map((item) => <blockquote key={item.turnId} className="muted">“{item.quote}”</blockquote>)}
            </details>
          ))}
        </div>
        <div className="result-notes">
          <section className="result-note" aria-labelledby="worked"><Icon name="check" /><div className="section"><h2 id="worked" className="heading">What worked:</h2><p>{evaluation.strength}</p>{evaluation.identifiedStrategies.length ? <p className="muted">Strategies shown: {evaluation.identifiedStrategies.map((strategy) => strategy.name).join(", ")}.</p> : null}</div></section>
          <section className="result-note" aria-labelledby="next"><Icon name="arrow" /><div className="section"><h2 id="next" className="heading">Try next time:</h2><p>{evaluation.nextStep}</p></div></section>
        </div>
      </div>
      <div className="result-split">
        <Transcript label="Your conversation" lines={lines} />
        <Notice tone="safety" title="Safety comes first">Choose the safest option for the situation. If someone is aggressive, has a weapon, or you are alone, contact staff, campus security, or 911.</Notice>
      </div>
      {reflecting ? <Dialog title="Reflection" onClose={() => setReflecting(false)} actions={<><Button tone="quiet" onClick={() => setReflecting(false)}>Cancel</Button><Button icon="check" onClick={() => { setReflection(session.sessionId, note.trim()); setReflecting(false); }}>Save</Button></>}><div className="wk-field"><label className="wk-field__hint" htmlFor="reflection">A private note to yourself. It stays in this browser.</label><textarea id="reflection" className="wk-field__control" rows={5} value={note} onChange={(event) => setNote(event.target.value)} autoFocus /></div></Dialog> : null}
      <div className="page-foot"><p className="caption muted">This result is private. Trying again is optional.</p></div>
    </>
  );
}
