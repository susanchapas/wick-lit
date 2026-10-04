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
  const listenerRequest = useRef(0);
  const listenerStarting = useRef(false);
  const submitRef = useRef<(text: string) => Promise<void>>(async () => undefined);
  const recordingRef = useRef<(audio: Blob) => Promise<void>>(async () => undefined);
  const field = useRef<HTMLInputElement>(null);
  const finishing = useRef(false);
  const exit = `/trails/${id}`;
  const timed = !settings.untimed;
  const liveState = useRef({ credential, mode, paused, typing });

  useEffect(() => {
    liveState.current = { credential, mode, paused, typing };
  }, [credential, mode, paused, typing]);

  const playCharacterTurns = useCallback(async (activeCredential: SessionCredential, turns: WickTurn[]) => {
    for (const turn of turns) {
      setSpeakingCharacter(speakerName(scenario, turn.speaker));
      await playTurn(activeCredential, turn.turnId);
    }
  }, [scenario]);

  const finish = useCallback(async () => {
    if (!credential || !session || finishing.current) return;
    finishing.current = true;
    listenerRequest.current += 1;
    recorder.current?.cancel();
    recorder.current = null;
    setListening(false);
    silence();
    setPhase("thinking");
    setError("");
    try {
      const completed = await endSession(credential);
      navigate(`/trails/${id}/result`, { state: { session: completed } });
    } catch {
      finishing.current = false;
      setPhase("live");
      setError("Wick could not finish and evaluate this session yet. Your conversation is kept; try again.");
    }
  }, [credential, id, navigate, session]);

  const beginListening = useCallback(async (manual = false) => {
    const current = liveState.current;
    if (current.mode !== "voice" || current.paused || (!manual && current.typing) || recorder.current || listenerStarting.current) return;
    if (manual) {
      liveState.current.typing = false;
      setTyping(false);
    }
    const request = ++listenerRequest.current;
    listenerStarting.current = true;
    try {
      let activeRecorder: AudioRecorder;
      activeRecorder = await record({
        onAutoStop: async (audio) => {
          if (recorder.current !== activeRecorder) return;
          recorder.current = null;
          setListening(false);
          await recordingRef.current(audio);
        },
      });
      const latest = liveState.current;
      if (request !== listenerRequest.current || latest.paused || (!manual && latest.typing)) {
        activeRecorder.cancel();
        return;
      }
      recorder.current = activeRecorder;
      setBlocked(false);
      setListening(true);
      setPhase("live");
    } catch {
      if (request !== listenerRequest.current) return;
      setBlocked(true);
      liveState.current.typing = true;
      setTyping(true);
      setPhase("live");
      requestAnimationFrame(() => field.current?.focus());
    } finally {
      listenerStarting.current = false;
    }
  }, []);

  const submit = useCallback(async (text: string) => {
    if (!credential || !text.trim() || paused || finishing.current) return;
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
      if (response.session.state === "completed") {
        const completed = await endSession(credential);
        navigate(`/trails/${id}/result`, { state: { session: completed } });
        return;
      }
      setPhase("live");
      await beginListening();
    } catch {
      setError("The scene did not reply. Your conversation is kept; try again.");
      setPhase("live");
    }
  }, [beginListening, credential, id, mode, navigate, paused, playCharacterTurns]);

  useEffect(() => {
    submitRef.current = submit;
  }, [submit]);

  const processRecording = useCallback(async (audio: Blob) => {
    const activeCredential = liveState.current.credential;
    if (!activeCredential) return;
    setListening(false);
    setPhase("transcribing");
    try {
      const text = await transcribeAudio(activeCredential, audio);
      setPhase("live");
      await submitRef.current(text);
    } catch {
      setPhase("live");
      setError("Wick could not transcribe that recording. Try speaking again or type your reply.");
    }
  }, []);

  useEffect(() => {
    recordingRef.current = processRecording;
  }, [processRecording]);

  const toggleListen = useCallback(async () => {
    if (paused) {
      liveState.current.paused = false;
      setPaused(false);
      await beginListening();
      return;
    }
    if (mode !== "voice" || blocked) {
      liveState.current.typing = true;
      setTyping(true);
      requestAnimationFrame(() => field.current?.focus());
      return;
    }
    if (listening && recorder.current) {
      setListening(false);
      setPhase("transcribing");
      try {
        const activeRecorder = recorder.current;
        recorder.current = null;
        await processRecording(await activeRecorder.stop());
      } catch {
        recorder.current = null;
        setPhase("live");
        setError("Wick could not transcribe that recording. Try speaking again or type your reply.");
      }
      return;
    }
    await beginListening(true);
  }, [beginListening, blocked, listening, mode, paused, processRecording]);

  const typeInstead = useCallback(() => {
    listenerRequest.current += 1;
    recorder.current?.cancel();
    recorder.current = null;
    setListening(false);
    liveState.current.typing = true;
    setTyping(true);
    setPhase("live");
    requestAnimationFrame(() => field.current?.focus());
  }, []);

  const resume = useCallback(() => {
    liveState.current.paused = false;
    setPaused(false);
    void beginListening();
  }, [beginListening]);

  useEffect(() => {
    if (!scenario) return;
    let live = true;
    startSession(scenario.id, mode).then(async (started) => {
      if (!live) return;
      const nextCredential = { sessionId: started.sessionId, sessionToken: started.sessionToken };
      liveState.current.credential = nextCredential;
      setCredential(nextCredential);
      setSession(started);
      setRemaining(Math.max(0, Math.ceil((Date.parse(started.conversationDeadline) - Date.now()) / 1000)));
      setPhase(mode === "voice" ? "speaking" : "live");
      if (mode === "voice") {
        try { await playCharacterTurns(nextCredential, started.turns); } catch { setError("The scene audio could not play, but you can continue with captions."); }
        if (live) {
          setPhase("live");
          await beginListening();
        }
      }
    }).catch(() => {
      if (live) {
        setError("The role-play could not start. Check your connection and try again.");
        setPhase("live");
      }
    });
    return () => {
      live = false;
      listenerRequest.current += 1;
      recorder.current?.cancel();
      recorder.current = null;
      silence();
    };
  }, [beginListening, mode, playCharacterTurns, scenario]);

  const stepOut = useCallback(async () => {
    listenerRequest.current += 1;
    recorder.current?.cancel();
    silence();
    if (credential) await stepOutSession(credential).catch(() => undefined);
    navigate(exit);
  }, [credential, exit, navigate]);

  const pause = useCallback(() => {
    listenerRequest.current += 1;
    recorder.current?.cancel();
    recorder.current = null;
    setListening(false);
    silence();
    liveState.current.paused = true;
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
        if (paused) resume();
        else pause();
      }
      else if (key === "t") { event.preventDefault(); typeInstead(); }
      else if (key === " ") { event.preventDefault(); void toggleListen(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pause, paused, resume, stepOut, toggleListen, typeInstead]);

  const orb: OrbState = paused ? "paused" : blocked ? "blocked" : phase === "thinking" || phase === "transcribing" || phase === "starting"
    ? "thinking" : phase === "speaking" ? "speaking" : listening ? "listening" : "idle";
  const hasUserTurn = Boolean(session?.turns.some((turn) => turn.role === "user"));

  return (
    <div className="session">
      <title>{`The clearing${scenario ? `: ${scenario.title}` : ""} · Wick`}</title>
      <SessionBar exitTo={exit} actions={<Button icon="pause" onClick={pause}>Pause</Button>}>
        <div className="session-bar__title">
          {timed && <Timer remaining={remaining} total={scenario?.durationSeconds ?? 120} />}
          <h1 className="aside">The Clearing — <span className="session-bar__scenario">{scenario?.title ?? "Setting the scene"}</span></h1>
        </div>
      </SessionBar>
      <main className="clearing">
        <div className="clearing__orb">
          <VoiceOrb state={orb} speaker={speakingCharacter} textMode={mode === "text"} onToggle={() => void toggleListen()} />
          <div className="actions center">
            {!typing ? <Button icon="direct" onClick={typeInstead}>Type instead</Button> : null}
            <Button icon="captions" aria-pressed={settings.captions} onClick={() => updateSettings({ captions: !settings.captions })}>Captions {settings.captions ? "on" : "off"}</Button>
          </div>
          {blocked ? <p className="caption danger" role="alert">Microphone blocked. Allow access in your browser settings, or type your reply.</p> : null}
          <div className="clearing__end"><Button icon="steady" onClick={() => void finish()} disabled={!hasUserTurn || phase !== "live"}>End and get feedback</Button></div>
          <section className="well clearing__keys" aria-label="Keyboard shortcuts">
            <ul className="chips center">{keys.map(([key, value]) => <li key={key} className="pill"><kbd>{key}</kbd> {value}</li>)}</ul>
          </section>
        </div>
        <section className="clearing__talk" aria-label="Conversation">
          {(settings.captions || typing) ? <Transcript lines={transcriptLines(session, scenario)} label="Live captions">{phase === "thinking" || phase === "transcribing" ? <Pending speaker={phase === "transcribing" ? "Wick" : "The scene"} /> : null}</Transcript> : null}
          {error ? <Notice tone="danger" title={error} action={<Button onClick={() => setError("")}>Dismiss</Button>} /> : null}
          {typing ? <form className="wk-field reply" onSubmit={(event) => { event.preventDefault(); void submit(draft); }}>
            <label className="wk-field__label" htmlFor="reply">Your reply</label>
            <div className="reply__row"><input ref={field} id="reply" className="wk-field__control" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What do you say or do?" disabled={paused || phase !== "live" || !credential} autoComplete="off" /><Button type="submit" icon="arrow" disabled={phase !== "live" || paused || !draft.trim() || !credential}>Send</Button></div>
          </form> : null}
        </section>
      </main>
      {paused ? <Dialog title="Role-play paused" onClose={resume} actions={<><Button tone="quiet" onClick={() => void stepOut()}>Step out</Button><Button icon="play" autoFocus onClick={resume}>Resume role-play</Button></>}>The timer and microphone are stopped. Nothing is being recorded.</Dialog> : null}
    </div>
  );
}
