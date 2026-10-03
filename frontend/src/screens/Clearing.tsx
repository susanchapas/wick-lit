import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button } from "../components/Button";
import { Dialog, Notice } from "../components/Feedback";
import { Pending, Timer, Transcript, VoiceOrb, type Line, type OrbState } from "../components/Session";
import { SessionBar } from "../components/SessionBar";
import { endSession, sendTurn, startSession, stepOutSession, transcribeAudio } from "../lib/api";
import { updateSettings, useSettings } from "../lib/settings";
import { canListen, playTurn, record, silence, type AudioRecorder } from "../lib/speech";
import type { Mode, Scenario, SessionCredential, WickSession, WickTurn } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { withPeriod } from "../lib/text";

const keys = [["Space", "speaks"], ["P", "pauses"], ["T", "types"], ["Esc", "steps out"]];

const speakerName = (scenario: Scenario | undefined, speaker: string) => scenario?.characterNames[speaker] ?? speaker;

const transcriptLines = (session?: WickSession | null, scenario?: Scenario): Line[] => [
  { role: "note", text: "Role-play started" },
  ...(session?.turns.map((turn): Line => turn.role === "user"
    ? { role: "you", text: turn.text }
    : { role: "ai", speaker: speakerName(scenario, turn.speaker), text: turn.text }) ?? []),
];

export function Clearing() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data } = useScenarios();
  const scenario = data?.find((candidate) => candidate.id === id);
  const settings = useSettings();
  const mode: Mode = settings.input === "voice" && canListen ? "voice" : "text";
  const [credential, setCredential] = useState<SessionCredential | null>(null);
  const [session, setSession] = useState<WickSession | null>(null);
  const [phase, setPhase] = useState<"starting" | "live" | "transcribing" | "thinking" | "speaking">("starting");
  const [paused, setPaused] = useState(false);
  const [listening, setListening] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [typing, setTyping] = useState(mode === "text");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [speakingCharacter, setSpeakingCharacter] = useState("Scene");
  const [remaining, setRemaining] = useState(scenario?.durationSeconds ?? 120);
  const recorder = useRef<AudioRecorder | null>(null);
  const field = useRef<HTMLInputElement>(null);
  const finishing = useRef(false);
  const exit = `/trails/${id}`;
  const timed = !settings.untimed;

  const playCharacterTurns = useCallback(async (activeCredential: SessionCredential, turns: WickTurn[]) => {
    for (const turn of turns) {
      setSpeakingCharacter(speakerName(scenario, turn.speaker));
      await playTurn(activeCredential, turn.turnId);
    }
  }, [scenario]);

  useEffect(() => {
    if (!scenario) return;
    let live = true;
    startSession(scenario.id, mode).then(async (started) => {
      if (!live) return;
      const nextCredential = { sessionId: started.sessionId, sessionToken: started.sessionToken };
      setCredential(nextCredential);
      setSession(started);
      setRemaining(Math.max(0, Math.ceil((Date.parse(started.conversationDeadline) - Date.now()) / 1000)));
      setPhase(mode === "voice" ? "speaking" : "live");
      if (mode === "voice") {
        try { await playCharacterTurns(nextCredential, started.turns); } catch { setError("The scene audio could not play, but you can continue with captions."); }
        if (live) setPhase("live");
      }
    }).catch(() => {
      if (live) {
        setError("The role-play could not start. Check the backend connection and try again.");
        setPhase("live");
      }
    });
    return () => {
      live = false;
      recorder.current?.cancel();
      silence();
    };
  }, [mode, playCharacterTurns, scenario]);

  const finish = useCallback(async () => {
    if (!credential || !session || finishing.current) return;
    finishing.current = true;
    setPhase("thinking");
    setError("");
    try {
      const completed = await endSession(credential);
      navigate(`/trails/${id}/result`, { state: { session: completed } });
    } catch {
      finishing.current = false;
      setPhase("live");
      setError("Wick could not finish and evaluate this session yet. Your conversation is still on the backend.");
    }
  }, [credential, id, navigate, session]);

  const submit = useCallback(async (text: string) => {
    if (!credential || !text.trim() || phase !== "live" || paused) return;
    setError("");
    setDraft("");
    setPhase("thinking");
    try {
      const response = await sendTurn(credential, text.trim(), mode);
      setSession(response.session);
      if (mode === "voice") {
        setPhase("speaking");
        try { await playCharacterTurns(credential, response.characterTurns); } catch { setError("The scene audio could not play, but every response is in the transcript."); }
      }
      setPhase("live");
      if (response.session.state === "completed") {
        const completed = await endSession(credential);
        navigate(`/trails/${id}/result`, { state: { session: completed } });
      }
    } catch {
      setError("The scene did not reply. Your backend session is still available; try again.");
      setPhase("live");
    }
  }, [credential, id, mode, navigate, paused, phase, playCharacterTurns]);

  const toggleListen = useCallback(async () => {
    if (paused) return setPaused(false);
    if (mode !== "voice" || blocked) {
      setTyping(true);
      requestAnimationFrame(() => field.current?.focus());
      return;
    }
    if (listening && recorder.current) {
      setListening(false);
      setPhase("transcribing");
      try {
        const audio = await recorder.current.stop();
        recorder.current = null;
        if (!credential) throw new Error("Session not ready");
        const text = await transcribeAudio(credential, audio);
        setPhase("live");
        await submit(text);
      } catch {
        recorder.current = null;
        setPhase("live");
        setError("Wick could not transcribe that recording. Try speaking again or type your reply.");
      }
      return;
    }
    try {
      recorder.current = await record();
      setListening(true);
    } catch {
      setBlocked(true);
      setTyping(true);
    }
  }, [blocked, credential, listening, mode, paused, submit]);

  const stepOut = useCallback(async () => {
    recorder.current?.cancel();
    silence();
    if (credential) await stepOutSession(credential).catch(() => undefined);
    navigate(exit);
  }, [credential, exit, navigate]);

  const pause = useCallback(() => {
    recorder.current?.cancel();
    recorder.current = null;
    setListening(false);
    silence();
    setPaused(true);
  }, []);

  useEffect(() => {
    if (!timed || paused || phase === "starting") return;
    if (remaining <= 0) {
      if (session?.turns.some((turn) => turn.role === "user")) window.setTimeout(() => void finish(), 0);
      return;
    }
    const timeout = window.setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [finish, paused, phase, remaining, session, timed]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return void stepOut();
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement || event.metaKey || event.ctrlKey) return;
      const key = event.key.toLowerCase();
      if (key === "p") {
        if (paused) setPaused(false);
        else pause();
      }
      else if (key === "t") { event.preventDefault(); setTyping(true); requestAnimationFrame(() => field.current?.focus()); }
      else if (key === " ") { event.preventDefault(); void toggleListen(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pause, paused, stepOut, toggleListen]);

  const orb: OrbState = paused ? "paused" : blocked ? "blocked" : phase === "thinking" || phase === "transcribing" || phase === "starting"
    ? "thinking" : phase === "speaking" ? "speaking" : listening ? "listening" : "idle";
  const hasUserTurn = Boolean(session?.turns.some((turn) => turn.role === "user"));

  return (
    <div className="session">
      <title>{`The clearing${scenario ? `: ${scenario.title}` : ""} · Wick`}</title>
      <SessionBar exitTo={exit} actions={<Button icon="pause" onClick={pause}>Pause</Button>}>
        {timed ? <Timer remaining={remaining} total={scenario?.durationSeconds ?? 120} /> : <span />}
      </SessionBar>
      <main className="clearing">
        <header className="clearing__head"><p className="aside">The clearing</p><h1 className="subtitle">{withPeriod(scenario?.title ?? "Setting the scene")}</h1></header>
        <div className="clearing__orb">
          <VoiceOrb state={orb} speaker={speakingCharacter} textMode={mode === "text"} onToggle={() => void toggleListen()} />
          <div className="actions center">
            {!typing ? <Button icon="direct" onClick={() => { setTyping(true); requestAnimationFrame(() => field.current?.focus()); }}>Type instead</Button> : null}
            <Button icon="captions" aria-pressed={settings.captions} onClick={() => updateSettings({ captions: !settings.captions })}>Captions {settings.captions ? "on" : "off"}</Button>
          </div>
          {blocked ? <p className="caption danger" role="alert">Microphone blocked. Allow access in your browser settings, or type your reply.</p> : null}
          <div className="clearing__end"><Button icon="steady" onClick={() => void finish()} disabled={!hasUserTurn || phase !== "live"}>End and get feedback</Button>{!hasUserTurn ? <p className="caption muted">Say or type one reply to get feedback.</p> : null}</div>
          <ul className="chips center clearing__keys" aria-label="Keyboard shortcuts">{keys.map(([key, value]) => <li key={key} className="pill"><kbd>{key}</kbd> {value}</li>)}</ul>
        </div>
        <section className="clearing__talk" aria-label="Conversation">
          {(settings.captions || typing) ? <Transcript lines={transcriptLines(session, scenario)} label="Live captions">{phase === "thinking" || phase === "transcribing" ? <Pending speaker={phase === "transcribing" ? "Wick" : "The scene"} /> : null}</Transcript> : null}
          <p className="caption muted">The transcript and conversation state come from your private Wick backend session.</p>
          {error ? <Notice tone="danger" title={error} action={<Button onClick={() => setError("")}>Dismiss</Button>} /> : null}
          {typing ? <form className="wk-field reply" onSubmit={(event) => { event.preventDefault(); void submit(draft); }}>
            <label className="wk-field__label" htmlFor="reply">Your reply</label>
            <div className="reply__row"><input ref={field} id="reply" className="wk-field__control" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What do you say or do?" disabled={paused || phase !== "live" || !credential} autoComplete="off" /><Button type="submit" icon="arrow" disabled={phase !== "live" || paused || !draft.trim() || !credential}>Send</Button></div>
          </form> : null}
        </section>
      </main>
      {paused ? <Dialog title="Role-play paused" onClose={() => setPaused(false)} actions={<><Button tone="quiet" onClick={() => void stepOut()}>Step out</Button><Button icon="play" autoFocus onClick={() => setPaused(false)}>Resume role-play</Button></>}>The timer and microphone are stopped. Nothing is being recorded.</Dialog> : null}
    </div>
  );
}
