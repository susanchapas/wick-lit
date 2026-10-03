import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import { Button, ButtonLink } from "../components/Button";
import { Meter, Notice } from "../components/Feedback";
import { Transcript } from "../components/Session";
import { addLantern, setReflection, useHistory } from "../lib/history";
import type { EvaluationDimension, WickSession } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { withPeriod } from "../lib/text";

interface ResultState { session: WickSession }
const statusValue = { insufficient_evidence: 0, not_demonstrated: 1, partly_demonstrated: 2, demonstrated: 3 } as const;
const statusLabel = (status: EvaluationDimension["status"]) => status.replaceAll("_", " ");

export function Result() {
  const { id = "" } = useParams();
  const state = useLocation().state as ResultState | null;
  const session = state?.session;
  const evaluation = session?.evaluation;
  const scenario = useScenarios().data?.find((candidate) => candidate.id === id);
  const [reflecting, setReflecting] = useState(false);
  const saved = useHistory().find((lantern) => lantern.id === session?.sessionId);
  const [note, setNote] = useState(saved?.reflection ?? "");

  useEffect(() => {
    if (!evaluation || !scenario || !session) return;
    addLantern({
      id: session.sessionId,
      scenarioId: session.scenarioId,
      title: scenario.title,
      strategies: evaluation.identifiedStrategies.map((strategy) => strategy.name),
      completedAt: session.endedAt ?? evaluation.metadata.evaluatedAt,
    });
  }, [evaluation, scenario, session]);

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

  return (
    <>
      <title>Coaching result · Wick</title>
      <header className="wk-score result-head is-done">
        <div className="wk-score__head"><p className="wk-score__over">Private feedback</p></div>
        <div className="section"><h1 className="wk-score__band subtitle">{withPeriod(evaluation.summary)}</h1><p className="wk-score__summary">{evaluation.strength}</p></div>
      </header>
      <ul className="rubric-grid">
        {dimensions.map(([name, dimension]) => <li key={name} className="wk-card panel"><Meter label={name} value={statusValue[dimension.status]} max={3} note={`${statusLabel(dimension.status)} — ${dimension.rationale}`} /></li>)}
      </ul>
      <div className="rubric-grid">
        <section className="wk-card panel" aria-labelledby="worked"><h2 id="worked" className="label">What worked.</h2><p>{evaluation.strength}</p>{evaluation.identifiedStrategies.length ? <p className="muted">Strategies shown: {evaluation.identifiedStrategies.map((strategy) => strategy.name).join(", ")}.</p> : null}</section>
        <section className="wk-card panel" aria-labelledby="next"><h2 id="next" className="label">Try next time.</h2><p>{evaluation.nextStep}</p></section>
      </div>
      <Notice tone="safety" title="Safety comes first">Choose the safest option for the situation. If someone is aggressive, has a weapon, or you are alone, contact staff, campus security, or 911.</Notice>
      <Transcript label="Your conversation" lines={lines} />
      {reflecting ? <form className="wk-field" onSubmit={(event) => { event.preventDefault(); setReflection(session.sessionId, note.trim()); setReflecting(false); }}><label className="wk-field__label" htmlFor="reflection">Reflection</label><p className="wk-field__hint">A private note to yourself. It stays in this browser.</p><textarea id="reflection" className="wk-field__control" rows={4} value={note} onChange={(event) => setNote(event.target.value)} autoFocus /><div className="actions"><Button type="submit" icon="check">Save reflection</Button><Button tone="quiet" onClick={() => setReflecting(false)}>Cancel</Button></div></form> : null}
      {saved?.reflection && !reflecting ? <Notice tone="steady" title="Reflection saved.">{saved.reflection}</Notice> : null}
      <div className="page-foot"><div className="actions">{retry}{!reflecting ? <Button icon="document" onClick={() => setReflecting(true)}>{saved?.reflection ? "Edit reflection" : "Reflect"}</Button> : null}</div><p className="caption muted">This result is private. Trying again is optional.</p></div>
    </>
  );
}
