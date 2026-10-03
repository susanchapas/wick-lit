import { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import { Button, ButtonLink } from "../components/Button";
import { Meter, Notice, WickLoader } from "../components/Feedback";
import { Transcript } from "../components/Session";
import { getScore, saveSession } from "../lib/api";
import { addLantern, setReflection, useHistory } from "../lib/history";
import { useSettings } from "../lib/settings";
import type { Message, ScoreResponse } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { withPeriod } from "../lib/text";

interface SessionState {
  transcript: Message[];
  startedAt: string;
}

const scores = new Map<string, Promise<ScoreResponse>>();

export function Result() {
  const { id = "" } = useParams();
  const session = useLocation().state as SessionState | null;
  const { intensity } = useSettings();
  const scenario = useScenarios().data?.find((s) => s.id === id);
  const [result, setResult] = useState<ScoreResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(false);
  const [reflecting, setReflecting] = useState(false);
  const key = session ? `${id}:${session.startedAt}` : "";
  const saved = useHistory().find((l) => l.id === key);
  const [note, setNote] = useState(saved?.reflection ?? "");

  useEffect(() => {
    if (!session) return;
    const body = { scenarioId: id, intensity, transcript: session.transcript };
    if (!scores.has(key)) scores.set(key, getScore(body).catch(() => getScore(body)));
    let live = true;
    scores.get(key)!.then(
      (r) => live && setResult(r),
      () => {
        scores.delete(key);
        if (live) setFailed(true);
      },
    );
    return () => {
      live = false;
    };
  }, [id, key, intensity, session]);

  useEffect(() => {
    if (!result || !scenario || !session) return;
    const completedAt = new Date().toISOString();
    addLantern({
      id: key,
      scenarioId: id,
      title: scenario.title,
      strategies: [...new Set(result.dimensions.map((d) => d.strategy))],
      completedAt,
    });
    saveSession({ ...result, scenarioId: id, intensity, transcript: session.transcript, startedAt: session.startedAt, completedAt });
    requestAnimationFrame(() => setShown(true));
  }, [result, scenario, session, key, id, intensity]);

  if (!session) return <Navigate to={`/trails/${id}`} replace />;

  const retry = (
    <ButtonLink tone="lantern" icon="replay" to={`/trails/${id}/clearing`}>
      Try again
    </ButtonLink>
  );

  if (failed)
    return (
      <>
        <title>Coaching result · Wick</title>
        <h1 className="title">Coaching result.</h1>
        <Notice tone="danger" title="Scoring unavailable right now." action={retry}>
          Your conversation is below. You can read it back, or try the trail again later.
        </Notice>
        <Transcript
          label="Your conversation"
          lines={session.transcript.map((m) =>
            m.speaker === "user" ? { role: "you", text: m.text } : { role: "ai", speaker: m.speaker, text: m.text },
          )}
        />
      </>
    );

  if (!result)
    return (
      <>
        <title>Coaching result · Wick</title>
        <h1 className="wk-sr">Coaching result.</h1>
        <div className="result-loading">
          <WickLoader label="Scoring your intervention" />
        </div>
      </>
    );

  const max = 100 / result.dimensions.length;

  return (
    <>
      <title>Coaching result · Wick</title>
      <header className={`wk-score result-head${shown ? " is-done" : ""}`}>
        <div className="wk-score__head">
          <p className="wk-score__over">Private result</p>
          <p className="wk-score__num" aria-hidden="true">
            {result.total}
            <small>/100</small>
          </p>
          <div className="wk-meter__track result-head__bar" aria-hidden="true">
            <div className="wk-meter__fill" style={{ width: shown ? `${result.total}%` : 0 }} />
          </div>
        </div>
        <div className="section">
          <h1 className="wk-score__band subtitle">
            <span className="wk-sr">
              Score {result.total} out of 100.{" "}
            </span>
            {withPeriod(result.headline)}
          </h1>
          <p className="wk-score__summary">{result.strengths[0]}</p>
        </div>
      </header>
      <ul className="rubric-grid">
        {result.dimensions.map((d) => (
          <li key={d.name} className="wk-card panel">
            <Meter label={d.name} value={shown ? d.score : 0} max={max} note={d.note} />
          </li>
        ))}
      </ul>
      <div className="rubric-grid">
        <section className="wk-card panel" aria-labelledby="worked">
          <h2 id="worked" className="label">
            What worked.
          </h2>
          <ul className="bullets">
            {result.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <section className="wk-card panel" aria-labelledby="next">
          <h2 id="next" className="label">
            Try next time.
          </h2>
          <ul className="bullets">
            {result.improvements.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="muted">
            One line you could use: <q className="dialogue">{result.exampleLine}</q>
          </p>
        </section>
      </div>
      <Notice tone="safety" title="Safety comes first">
        Direct is for when you are safe. If someone is aggressive, has a weapon, or you are alone, choose Delegate. Contact
        staff, campus security or 911.
      </Notice>
      {reflecting && (
        <form
          className="wk-field"
          onSubmit={(e) => {
            e.preventDefault();
            setReflection(key, note.trim());
            setReflecting(false);
          }}
        >
          <label className="wk-field__label" htmlFor="reflection">
            Reflection
          </label>
          <p className="wk-field__hint">A private note to yourself. It stays in this browser.</p>
          <textarea id="reflection" className="wk-field__control" rows={4} value={note} onChange={(e) => setNote(e.target.value)} autoFocus />
          <div className="actions">
            <Button type="submit" icon="check">
              Save reflection
            </Button>
            <Button tone="quiet" onClick={() => setReflecting(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
      {saved?.reflection && !reflecting && <Notice tone="steady" title="Reflection saved.">{saved.reflection}</Notice>}
      <div className="page-foot">
        <div className="actions">
          {retry}
          {!reflecting && (
            <Button icon="document" onClick={() => setReflecting(true)}>
              {saved?.reflection ? "Edit reflection" : "Reflect"}
            </Button>
          )}
        </div>
        <p className="caption muted">This result is private. Trying again is optional.</p>
      </div>
    </>
  );
}
