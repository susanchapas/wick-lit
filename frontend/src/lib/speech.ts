import { speak } from "./api";

interface Recognition {
  lang: string;
  interimResults: boolean;
  onresult: (e: SpeechRecognitionEvent) => void;
  onerror: (e: { error: string }) => void;
  onend: () => void;
  start(): void;
  abort(): void;
}

const w = window as unknown as Record<string, (new () => Recognition) | undefined>;
const Recognizer = w.SpeechRecognition ?? w.webkitSpeechRecognition;

export const canListen = Boolean(Recognizer);

export function listen(onText: (text: string) => void, onBlocked: () => void, onEnd: () => void) {
  const r = new Recognizer!();
  r.lang = "en-US";
  r.interimResults = false;
  r.onresult = (e) => onText(Array.from(e.results, (res) => res[0].transcript).join(" ").trim());
  r.onerror = (e) => {
    if (e.error === "not-allowed" || e.error === "service-not-allowed") onBlocked();
  };
  r.onend = onEnd;
  r.start();
  return () => r.abort();
}

let voiceOut = true;
let current: HTMLAudioElement | null = null;

export async function play(speaker: string, text: string) {
  if (!voiceOut) return;
  try {
    const url = URL.createObjectURL(await speak({ speaker, text }));
    current = new Audio(url);
    await new Promise<void>((resolve) => {
      current!.onended = current!.onerror = () => resolve();
      current!.play().catch(() => resolve());
    });
    URL.revokeObjectURL(url);
  } catch {
    voiceOut = false;
  }
}

export function silence() {
  current?.pause();
  current = null;
}
