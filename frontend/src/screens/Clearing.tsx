import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, ButtonLink } from "../components/Button";
import { Dialog, Notice } from "../components/Feedback";
import { Pending, Timer, Transcript, VoiceOrb, type Line, type OrbState } from "../components/Session";
import { SessionBar } from "../components/SessionBar";
import { sendTurn } from "../lib/api";
import { updateSettings, useSettings } from "../lib/settings";
import { canListen, listen, play, silence } from "../lib/speech";
import type { Message } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { withPeriod } from "../lib/text";

const TOTAL = 60;
const keys = [
  ["Space", "speaks"],
  ["P", "pauses"],
  ["T", "types"],
  ["Esc", "steps out"],
];

export function Clearing() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { data } = useScenarios();
  const scenario = data?.find((s) => s.id === id);
  const settings = useSettings();
  const voice = settings.input === "voice" && canListen;

  const [messages, setMessages] = useState<Message[]>([]);
  const [lines, setLines] = useState<Line[]>([{ role: "note", text: "Role-play started" }]);
  const [phase, setPhase] = useState<"live" | "thinking" | "speaking">("live");
  const [speaker, setSpeaker] = useState("");
  const [paused, setPaused] = useState(false);
  const [listening, setListening] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [typing, setTyping] = useState(!voice);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);
  const [turn, setTurn] = useState(0);
  const [remaining, setRemaining] = useState(TOTAL);
  const [draft, setDraft] = useState("");
  const [startedAt] = useState(() => new Date().toISOString());
  const stopListening = useRef<(() => void) | null>(null);
  const field = useRef<HTMLInputElement>(null);

  const exit = `/trails/${id}`;
  const timed = !settings.untimed;

  const finish = useCallback(
    (transcript: Message[]) => navigate(`/trails/${id}/result`, { state: { transcript, startedAt } }),
    [id, navigate, startedAt],
  );

  const request = async (history: Message[]) => {
    setFailed(false);
    setPhase("thinking");
    try {
      const res = await sendTurn({ scenarioId: id, mode: voice ? "voice" : "text", intensity: settings.intensity, messages: history });
      let next = history;
      for (const r of res.replies) {
        next = [...next, r];
        setMessages(next);
        setLines((l) => [...l, { role: "ai", speaker: r.speaker, text: r.text }]);
        setSpeaker(r.speaker);
        setPhase("speaking");
        if (voice) await play(r.speaker, r.text);
      }
      setTurn(res.turn);
      if (res.ended) setEnded(true);
    } catch {
      setFailed(true);
    }
    setPhase("live");
  };

  const send = (text: string) => {
    if (!text || phase !== "live" || paused) return;
    const history = [...messages, { speaker: "user", text }];
    setMessages(history);
    setLines((l) => [...l, { role: "you", text }]);
    setDraft("");
    request(history);
  };

  const toggleListen = () => {
    if (paused) return setPaused(false);
    if (!voice || blocked) return type();
    if (listening) return stopListening.current?.();
    setListening(true);
    stopListening.current = listen(send, () => setBlocked(true), () => setListening(false));
  };

  function type() {
    setTyping(true);
    field.current?.focus();
  }

  useEffect(() => {
    if (scenario?.openingAudio && voice) new Audio(scenario.openingAudio).play().catch(() => {});
  }, [scenario, voice]);

  useEffect(() => () => {
    stopListening.current?.();
    silence();
  }, []);

  useEffect(() => {
    if (!timed || paused || remaining === 0) return;
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [timed, paused, remaining]);

  useEffect(() => {
    if (phase === "live" && !failed && (ended || (timed && remaining === 0)) && messages.length) finish(messages);
  }, [phase, failed, ended, timed, remaining, messages, finish]);

  useEffect(() => {
    if (paused) {
      stopListening.current?.();
      silence();
    }
  }, [paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return navigate(exit);
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLButtonElement || e.metaKey || e.ctrlKey) return;
      const k = e.key.toLowerCase();
      if (k === "p") setPaused((p) => !p);
      else if (k === "t") {
        e.preventDefault();
        type();
      } else if (k === " ") {
        e.preventDefault();
        toggleListen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const orb: OrbState = paused
    ? "paused"
    : blocked
      ? "blocked"
      : phase !== "live"
        ? phase
        : listening
          ? "listening"
          : "idle";

  return (
    <div className="session">
      <title>{`The clearing${scenario ? `: ${scenario.title}` : ""} · Wick`}</title>
      <SessionBar
        exitTo={exit}
        actions={
          <Button icon="pause" onClick={() => setPaused(true)}>
            Pause
          </Button>
        }
      >
        {timed ? <Timer remaining={remaining} total={TOTAL} /> : <span />}
      </SessionBar>
      <main className="clearing">
        <header className="clearing__head">
          <p className="aside">The clearing</p>
          <h1 className="subtitle">{withPeriod(scenario?.title ?? "Setting the scene")}</h1>
        </header>
        <div className="clearing__orb">
          <VoiceOrb state={orb} speaker={speaker} onToggle={toggleListen} />
          <div className="actions center">
            {!typing && (
              <Button icon="direct" onClick={type}>
                Type instead
              </Button>
            )}
            <Button icon="captions" aria-pressed={settings.captions} onClick={() => updateSettings({ captions: !settings.captions })}>
              Captions {settings.captions ? "on" : "off"}
            </Button>
          </div>
          {blocked && (
            <p className="caption danger" role="alert">
              Microphone blocked. Allow it in your browser settings, or type your reply instead.
            </p>
          )}
        </div>
        <section className="clearing__talk" aria-label="Conversation">
          {(settings.captions || typing) && (
            <Transcript lines={lines} label="Live captions">
              {phase === "thinking" && <Pending speaker={scenario?.characters[0] ?? "Your partner"} />}
            </Transcript>
          )}
          <p className="caption muted">Live captions are private to this session. Voice audio is deleted after 24 hours.</p>
          {failed && (
            <Notice tone="danger" title="Your partner did not reply." action={<Button onClick={() => request(messages)}>Try again</Button>}>
              Your conversation is kept. Check your connection, then try again.
            </Notice>
          )}
          {turn >= 6 && !ended && (
            <Notice tone="steady" title="You can end and get scored now.">
              Or keep going. The scene ends after a few more turns.
            </Notice>
          )}
          {typing && (
            <form
              className="wk-field reply"
              onSubmit={(e) => {
                e.preventDefault();
                send(draft.trim());
              }}
            >
              <label className="wk-field__label" htmlFor="reply">
                Your reply
              </label>
              <div className="reply__row">
                <input
                  ref={field}
                  id="reply"
                  className="wk-field__control"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={`Hey ${scenario?.characters[1] ?? "there"}, can you come help me?`}
                  disabled={paused}
                  autoComplete="off"
                  autoFocus
                />
                <Button type="submit" icon="arrow" disabled={phase !== "live" || paused || !draft.trim()}>
                  Send
                </Button>
              </div>
            </form>
          )}
        </section>
        <ul className="chips center clearing__keys" aria-label="Keyboard shortcuts">
          {keys.map(([k, v]) => (
            <li key={k} className="pill">
              <kbd>{k}</kbd> {v}
            </li>
          ))}
        </ul>
        <div className="clearing__end">
          <Button icon="steady" onClick={() => finish(messages)} disabled={!messages.length || phase !== "live"}>
            End and get scored
          </Button>
          {!messages.length && <p className="caption muted">Say or type one reply to get scored.</p>}
        </div>
      </main>
      {paused && (
        <Dialog
          title="Role-play paused"
          onClose={() => setPaused(false)}
          actions={
            <>
              <ButtonLink tone="quiet" to={exit}>
                Step out
              </ButtonLink>
              <Button icon="play" autoFocus onClick={() => setPaused(false)}>
                Resume role-play
              </Button>
            </>
          }
        >
          The timer and the microphone are stopped. Nothing is recorded.
        </Dialog>
      )}
    </div>
  );
}
