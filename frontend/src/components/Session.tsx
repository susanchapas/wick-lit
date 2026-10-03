import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./Icon";

const R = 41;
const C = 2 * Math.PI * R;

export function Timer({ remaining, total }: { remaining: number; total: number }) {
  const low = remaining <= 10;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  return (
    <div className={low ? "wk-timer wk-timer--low" : "wk-timer"} role="timer" aria-label={`${remaining} seconds left`}>
      <svg viewBox="0 0 88 88" width="88" height="88" aria-hidden="true">
        <circle className="wk-timer__track" cx="44" cy="44" r={R} fill="none" strokeWidth="6" />
        <circle
          className="wk-timer__burn"
          cx="44"
          cy="44"
          r={R}
          fill="none"
          strokeWidth="6"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - remaining / total)}
        />
      </svg>
      <p className="wk-timer__num" aria-hidden="true">
        {minutes}:{String(seconds).padStart(2, "0")}
        <small>{low ? "wrap up" : "left"}</small>
      </p>
    </div>
  );
}

export type OrbState = "idle" | "listening" | "thinking" | "speaking" | "paused" | "blocked";

const orbCopy: Record<OrbState, { status: string; hint: string; label: string }> = {
  idle: { status: "Ready when you are", hint: "Press to speak, or type your reply.", label: "Start speaking" },
  listening: { status: "Listening", hint: "Speak when you are ready.", label: "Stop speaking" },
  thinking: { status: "Thinking", hint: "Your partner is choosing a reply.", label: "Thinking" },
  speaking: { status: "is speaking", hint: "Captions show each line.", label: "Speaking" },
  paused: { status: "Paused", hint: "Nothing is recorded.", label: "Resume role-play" },
  blocked: { status: "Microphone blocked", hint: "Type your reply instead.", label: "Type instead" },
};

interface VoiceOrbProps {
  state: OrbState;
  speaker?: string;
  onToggle: () => void;
  textMode?: boolean;
}

export function VoiceOrb({ state, speaker, onToggle, textMode = false }: VoiceOrbProps) {
  const c = textMode && state === "idle"
    ? { status: "Ready when you are", hint: "Type your reply below.", label: "Focus reply" }
    : orbCopy[state];
  const busy = state === "thinking" || state === "speaking";
  return (
    <div className="wk-orb" data-state={state}>
      <button
        type="button"
        className="wk-orb__btn"
        onClick={onToggle}
        disabled={busy}
        aria-pressed={state === "listening"}
        aria-label={c.label}
      >
        <span className="wk-orb__halo" />
        {state === "thinking" ? (
          <span className="wk-orb__embers">
            <i />
            <i />
            <i />
          </span>
        ) : state === "speaking" ? (
          <span className="wk-orb__wave">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <Icon name={state === "blocked" ? "mic-off" : state === "paused" ? "play" : textMode ? "direct" : "mic"} />
        )}
      </button>
      <p className="wk-orb__status" aria-live="polite">
        {state === "speaking" ? `${speaker ?? "Your partner"} ${c.status}` : c.status}
      </p>
      <p className="wk-orb__hint">{c.hint}</p>
    </div>
  );
}

export interface Line {
  role: "ai" | "you" | "note";
  speaker?: string;
  text: string;
}

export function Transcript({ lines, label, children }: { lines: Line[]; label: string; children?: ReactNode }) {
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" });
  }, [lines, children]);
  return (
    <div ref={log} className="wk-transcript" role="log" aria-live="polite" aria-label={label}>
      {lines.map((l, i) => (
        <div key={i} className={`wk-line${l.role === "you" ? " wk-line--you" : l.role === "note" ? " wk-line--note" : ""}`}>
          {l.role !== "note" && (
            <span className="wk-line__who">
              <span className="wk-line__dot" aria-hidden="true" />
              {l.role === "you" ? "You" : l.speaker}
            </span>
          )}
          <p className="wk-line__bubble">{l.text}</p>
        </div>
      ))}
      {children}
    </div>
  );
}

export function Pending({ speaker }: { speaker: string }) {
  return (
    <div className="wk-line">
      <span className="wk-line__who">
        <span className="wk-line__dot" aria-hidden="true" />
        {speaker} is speaking
      </span>
      <span className="wk-typing" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
