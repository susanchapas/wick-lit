import { getTurnSpeech } from "./api";

export const canListen = typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== "undefined";

export interface AudioRecorder {
  stop(): Promise<Blob>;
  cancel(): void;
}

export async function record(): Promise<AudioRecorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const chunks: BlobPart[] = [];
  const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
  const recorder = new MediaRecorder(stream, { mimeType });
  recorder.ondataavailable = (event) => {
    if (event.data.size) chunks.push(event.data);
  };
  recorder.start();

  const close = () => stream.getTracks().forEach((track) => track.stop());
  return {
    stop: () => new Promise<Blob>((resolve, reject) => {
      recorder.onerror = () => {
        close();
        reject(new Error("Recording failed"));
      };
      recorder.onstop = () => {
        close();
        resolve(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
      };
      recorder.stop();
    }),
    cancel: () => {
      recorder.onstop = null;
      if (recorder.state !== "inactive") recorder.stop();
      close();
    },
  };
}

let current: HTMLAudioElement | null = null;
let currentUrl: string | null = null;

export async function playTurn(credential: { sessionId: string; sessionToken: string }, turnId: string) {
  silence();
  const url = URL.createObjectURL(await getTurnSpeech(credential, turnId));
  currentUrl = url;
  current = new Audio(url);
  await new Promise<void>((resolve, reject) => {
    current!.onended = () => resolve();
    current!.onerror = () => reject(new Error("Voice playback failed"));
    current!.play().catch(reject);
  }).finally(silence);
}

export function silence() {
  current?.pause();
  current = null;
  if (currentUrl) URL.revokeObjectURL(currentUrl);
  currentUrl = null;
}
