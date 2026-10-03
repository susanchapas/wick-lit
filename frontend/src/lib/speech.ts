import { getTurnSpeech } from "./api";

export const canListen = typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia) && typeof MediaRecorder !== "undefined";

export interface AudioRecorder {
  stop(): Promise<Blob>;
  cancel(): void;
}

interface RecordingOptions {
  onAutoStop?: (audio: Blob) => void | Promise<void>;
  silenceMs?: number;
}

export async function record({ onAutoStop, silenceMs = 1_200 }: RecordingOptions = {}): Promise<AudioRecorder> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const chunks: BlobPart[] = [];
  const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
  const recorder = new MediaRecorder(stream, { mimeType });
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();
  const samples = new Float32Array(analyser.fftSize = 512);
  let animationFrame = 0;
  let heardSpeech = false;
  let speechStartedAt = 0;
  let silenceStartedAt = 0;
  let stopping = false;
  let stopPromise: Promise<Blob> | null = null;

  source.connect(analyser);
  await audioContext.resume().catch(() => undefined);
  recorder.ondataavailable = (event) => {
    if (event.data.size) chunks.push(event.data);
  };
  recorder.start();

  const close = () => {
    cancelAnimationFrame(animationFrame);
    source.disconnect();
    void audioContext.close();
    stream.getTracks().forEach((track) => track.stop());
  };
  const stop = () => {
    if (stopPromise) return stopPromise;
    stopping = true;
    stopPromise = new Promise<Blob>((resolve, reject) => {
      recorder.onerror = () => {
        close();
        reject(new Error("Recording failed"));
      };
      recorder.onstop = () => {
        close();
        resolve(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
      };
      recorder.stop();
    });
    return stopPromise;
  };
  const detectSilence = () => {
    if (stopping) return;
    analyser.getFloatTimeDomainData(samples);
    let energy = 0;
    for (const sample of samples) energy += sample * sample;
    const level = Math.sqrt(energy / samples.length);
    const now = performance.now();
    if (level >= 0.02) {
      speechStartedAt ||= now;
      if (now - speechStartedAt >= 120) heardSpeech = true;
      silenceStartedAt = 0;
    } else if (!heardSpeech) {
      speechStartedAt = 0;
    } else {
      silenceStartedAt ||= now;
      if (now - silenceStartedAt >= silenceMs) {
        void stop().then((audio) => onAutoStop?.(audio));
        return;
      }
    }
    animationFrame = requestAnimationFrame(detectSilence);
  };
  animationFrame = requestAnimationFrame(detectSilence);

  return {
    stop,
    cancel: () => {
      stopping = true;
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
