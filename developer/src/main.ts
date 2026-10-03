import "./style.css";

type Mode = "text" | "voice";
type SessionState = "active" | "completed" | "stepped_out" | "failed" | "expired";

interface WickTurn {
  turnId: string;
  role: "user" | "character";
  speaker: string;
  text: string;
  sourceMedium: "text" | "audio";
  createdAt: string;
}

interface WickSession {
  sessionId: string;
  sessionToken?: string;
  scenarioId: string;
  mode: Mode;
  state: SessionState;
  conversationDeadline: string;
  turns: WickTurn[];
}

interface MessageResponse {
  userTurn: WickTurn;
  characterTurn: WickTurn;
  session: WickSession;
}

const startButton = element<HTMLButtonElement>("start");
const finishButton = element<HTMLButtonElement>("finish");
const stepOutButton = element<HTMLButtonElement>("step-out");
const statusElement = element<HTMLElement>("status");
const timerElement = element<HTMLElement>("timer");
const messagesElement = element<HTMLOListElement>("messages");
const messageForm = element<HTMLFormElement>("message-form");
const messageInput = element<HTMLInputElement>("message");
const sendButton = element<HTMLButtonElement>("send");
const modePicker = element<HTMLFieldSetElement>("mode-picker");
const voiceControls = element<HTMLElement>("voice-controls");
const recordTurnButton = element<HTMLButtonElement>("record-turn");
const recordingStatus = element<HTMLElement>("recording-status");
const audioElement = element<HTMLAudioElement>("alex-audio");
const sessionData = element<HTMLElement>("session-data");
const transcriptSummary = element<HTMLElement>("transcript-summary");
const recordingDownload = element<HTMLAnchorElement>("recording-download");

let session: WickSession | undefined;
let token: string | undefined;
let recorder: UserOnlyRecorder | undefined;
let userOnlyRecording: Blob | undefined;
let busy = false;
let countdownTimer: number | undefined;
let currentAudioUrl: string | undefined;
let recordingUrl: string | undefined;
const renderedTurns = new Set<string>();

startButton.addEventListener("click", () => void startSelectedMode());
finishButton.addEventListener("click", () => void finishSession(false));
stepOutButton.addEventListener("click", () => void finishSession(true));
recordTurnButton.addEventListener("click", () => void toggleRecording());
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (text) void sendMessage(text, "text");
});
window.addEventListener("beforeunload", () => {
  recorder?.dispose();
  revokeUrls();
});

async function startSelectedMode() {
  resetPage();
  const mode = selectedMode();
  setSetupDisabled(true);
  setStatus(mode === "voice" ? "Waiting for microphone permission…" : "Starting scenario…");
  try {
    if (mode === "voice") {
      recorder = new UserOnlyRecorder();
      await recorder.start();
      recordingStatus.textContent = "Microphone ready — only your mic is being recorded.";
    }
    const started = await api<WickSession & { sessionToken: string }>("/sessions", {
      method: "POST",
      body: JSON.stringify({ scenarioId: "party-hesitant-friend", mode }),
    }, false);
    session = started;
    token = started.sessionToken;
    renderTurns(started.turns);
    startCountdown(started.conversationDeadline);
    setActiveControls(true);
    if (mode === "voice") {
      await playCharacterTurn(started.turns[0]);
      setStatus("Ready — press Start speaking");
    } else {
      setStatus("Ready — type your response");
      messageInput.focus();
    }
  } catch (error) {
    setStatus(errorMessage(error));
    await recorder?.stop().catch(() => undefined);
    recorder = undefined;
    setSetupDisabled(false);
  }
}

async function sendMessage(text: string, sourceMedium: "text" | "audio") {
  if (!session || busy) return;
  busy = true;
  setActiveControls(false);
  setStatus("Alex is thinking…");
  try {
    const result = await api<MessageResponse>(`/sessions/${session.sessionId}/message`, {
      method: "POST",
      body: JSON.stringify({ text, sourceMedium }),
    });
    session = { ...result.session, sessionToken: token };
    messageInput.value = "";
    renderTurns([result.userTurn, result.characterTurn]);
    if (session.mode === "voice") {
      await playCharacterTurn(result.characterTurn);
      setStatus(session.state === "active" ? "Ready — press Start speaking" : "Scenario complete");
    } else {
      setStatus(session.state === "active" ? "Ready — type your response" : "Scenario complete");
    }
    if (session.state !== "active") {
      clearCountdown();
      await finishLocalRecording();
      setSetupDisabled(false);
    }
  } catch (error) {
    setStatus(errorMessage(error));
  } finally {
    busy = false;
    setActiveControls(session?.state === "active");
  }
}

async function toggleRecording() {
  if (!recorder || !session || busy) return;
  if (!recorder.isCapturing) {
    recorder.beginUtterance();
    recordTurnButton.textContent = "Stop speaking";
    recordingStatus.textContent = "Recording your response…";
    setStatus("Listening…");
    return;
  }

  busy = true;
  setActiveControls(false);
  try {
    setStatus("Preparing your recording…");
    const utterance = await recorder.endUtterance();
    console.info("Wick user utterance captured", { bytes: utterance.size, type: utterance.type });
    recordingStatus.textContent = "Transcribing your response…";
    const form = new FormData();
    form.set("audio", utterance, fileNameFor(utterance.type));
    const transcript = await api<{ text: string }>(`/sessions/${session.sessionId}/transcribe`, {
      method: "POST",
      body: form,
    });
    recordingStatus.textContent = `Transcript: “${transcript.text}”`;
    await sendMessageWhileBusy(transcript.text);
  } catch (error) {
    setStatus(`${errorMessage(error)} Press Start speaking to retry.`);
    recordingStatus.textContent = "That utterance was not added to the transcript.";
  } finally {
    busy = false;
    recordTurnButton.textContent = "Start speaking";
    setActiveControls(session?.state === "active");
  }
}

async function sendMessageWhileBusy(text: string) {
  if (!session) return;
  setStatus("Alex is thinking…");
  const result = await api<MessageResponse>(`/sessions/${session.sessionId}/message`, {
    method: "POST",
    body: JSON.stringify({ text, sourceMedium: "audio" }),
  });
  session = { ...result.session, sessionToken: token };
  renderTurns([result.userTurn, result.characterTurn]);
  await playCharacterTurn(result.characterTurn);
  setStatus(session.state === "active" ? "Ready — press Start speaking" : "Scenario complete");
  if (session.state !== "active") {
    clearCountdown();
    await finishLocalRecording();
    setSetupDisabled(false);
  }
}

async function playCharacterTurn(turn: WickTurn) {
  if (!session) return;
  setStatus("Alex is speaking…");
  const response = await authenticatedFetch(`/sessions/${session.sessionId}/turns/${turn.turnId}/speech`, { method: "POST" });
  if (!response.ok) throw new Error(await responseError(response));
  const blob = await response.blob();
  console.info("Wick TTS audio received", { bytes: blob.size, type: blob.type });
  if (!blob.size) throw new Error("Alex's audio was empty.");
  if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
  currentAudioUrl = URL.createObjectURL(blob);
  audioElement.src = currentAudioUrl;
  audioElement.classList.remove("hidden");
  try {
    await audioElement.play();
    console.info("Wick TTS playback started");
    await once(audioElement, "ended");
  } catch (error) {
    console.warn("Wick TTS playback needs user action", { name: error instanceof Error ? error.name : "Error" });
    setStatus("Alex's audio is ready — press Play below");
  }
}

async function finishSession(stepOut: boolean) {
  if (!session || busy) return;
  busy = true;
  setActiveControls(false);
  clearCountdown();
  setStatus(stepOut ? "Stepping out…" : "Ending session…");
  try {
    session = await api<WickSession>(`/sessions/${session.sessionId}/${stepOut ? "step-out" : "end"}`, { method: "POST" });
    await finishLocalRecording();
    renderTurns(session.turns);
    setStatus(stepOut ? "Stepped out" : "Session complete");
    setSetupDisabled(false);
  } catch (error) {
    setStatus(errorMessage(error));
  } finally {
    busy = false;
  }
}

async function finishLocalRecording() {
  if (recorder) {
    userOnlyRecording = await recorder.stop();
    recorder = undefined;
  }
  sessionData.classList.remove("hidden");
  transcriptSummary.textContent = `${session?.turns.length ?? 0} canonical transcript turns retained by Wick.`;
  if (userOnlyRecording?.size) {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    recordingUrl = URL.createObjectURL(userOnlyRecording);
    recordingDownload.href = recordingUrl;
    recordingDownload.classList.remove("hidden");
    recordingStatus.textContent = `User-only recording ready (${formatBytes(userOnlyRecording.size)}, ${userOnlyRecording.type}).`;
  }
}

export function getUserOnlyAudioRecording(): Blob | undefined {
  return userOnlyRecording;
}

function renderTurns(turns: WickTurn[]) {
  for (const turn of turns) {
    if (renderedTurns.has(turn.turnId)) continue;
    renderedTurns.add(turn.turnId);
    const item = document.createElement("li");
    item.className = `message ${turn.role === "character" ? "character" : "user"}`;
    const speaker = document.createElement("span");
    speaker.className = "speaker";
    speaker.textContent = turn.role === "character" ? "Alex" : "You";
    const text = document.createElement("span");
    text.className = "message-text";
    text.textContent = turn.text;
    item.append(speaker, text);
    messagesElement.append(item);
    item.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

class UserOnlyRecorder {
  private stream?: MediaStream;
  private mediaRecorder?: MediaRecorder;
  private chunks: Blob[] = [];
  private utteranceRecorder?: MediaRecorder;
  private utteranceChunks: Blob[] = [];
  isCapturing = false;

  async start() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      throw new Error("This browser does not support microphone recording.");
    }
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mimeType = preferredMimeType();
    this.mediaRecorder = new MediaRecorder(this.stream, mimeType ? { mimeType } : undefined);
    this.mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) this.chunks.push(event.data);
    });
    this.mediaRecorder.start(250);
  }

  beginUtterance() {
    if (!this.mediaRecorder || this.mediaRecorder.state !== "recording") throw new Error("Microphone is not ready.");
    this.utteranceChunks = [];
    const mimeType = this.mediaRecorder.mimeType || preferredMimeType();
    this.utteranceRecorder = new MediaRecorder(
      this.stream!,
      mimeType ? { mimeType } : undefined,
    );
    this.utteranceRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) this.utteranceChunks.push(event.data);
    });
    // Each utterance needs its own container header. Slicing chunks from the
    // session-wide WebM produces headerless fragments that STT cannot decode.
    this.utteranceRecorder.start();
    this.isCapturing = true;
  }

  async endUtterance(): Promise<Blob> {
    if (!this.utteranceRecorder || !this.isCapturing) throw new Error("No utterance is being recorded.");
    const utteranceRecorder = this.utteranceRecorder;
    const stopped = once(utteranceRecorder, "stop");
    utteranceRecorder.stop();
    await stopped;
    this.isCapturing = false;
    this.utteranceRecorder = undefined;
    const blob = new Blob(this.utteranceChunks, { type: utteranceRecorder.mimeType || "audio/webm" });
    if (!blob.size) throw new Error("No audio was recorded. Please try again.");
    return blob;
  }

  async stop(): Promise<Blob> {
    if (!this.mediaRecorder) return new Blob();
    const mediaRecorder = this.mediaRecorder;
    if (mediaRecorder.state !== "inactive") {
      const stopped = once(mediaRecorder, "stop");
      mediaRecorder.stop();
      await stopped;
    }
    for (const track of this.stream?.getTracks() ?? []) track.stop();
    const blob = new Blob(this.chunks, { type: mediaRecorder.mimeType || "audio/webm" });
    this.mediaRecorder = undefined;
    this.stream = undefined;
    this.isCapturing = false;
    return blob;
  }

  dispose() {
    if (this.utteranceRecorder?.state === "recording") this.utteranceRecorder.stop();
    for (const track of this.stream?.getTracks() ?? []) track.stop();
    if (this.mediaRecorder?.state === "recording") this.mediaRecorder.stop();
  }
}

async function api<T>(path: string, init: RequestInit = {}, authenticated = true): Promise<T> {
  const response = await authenticatedFetch(path, init, authenticated);
  if (!response.ok) throw new Error(await responseError(response));
  return await response.json() as T;
}

function authenticatedFetch(path: string, init: RequestInit = {}, authenticated = true) {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData)) headers.set("content-type", "application/json");
  if (authenticated && token) headers.set("authorization", `Bearer ${token}`);
  return fetch(`/api${path}`, { ...init, headers });
}

async function responseError(response: Response) {
  const body = await response.json().catch(() => ({})) as { error?: { message?: string } };
  return body.error?.message ?? `Request failed (${response.status}).`;
}

function setActiveControls(active: boolean | undefined) {
  finishButton.disabled = !active;
  stepOutButton.disabled = !active;
  const textActive = Boolean(active && session?.mode === "text");
  messageInput.disabled = !textActive;
  sendButton.disabled = !textActive;
  const voiceActive = Boolean(active && session?.mode === "voice");
  recordTurnButton.disabled = !voiceActive;
  voiceControls.classList.toggle("hidden", session?.mode !== "voice");
}

function setSetupDisabled(disabled: boolean) {
  startButton.disabled = disabled;
  for (const input of modePicker.querySelectorAll<HTMLInputElement>("input")) input.disabled = disabled;
}

function startCountdown(deadline: string) {
  clearCountdown();
  const update = () => {
    const seconds = Math.max(0, Math.ceil((Date.parse(deadline) - Date.now()) / 1000));
    timerElement.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    if (seconds === 0 && session?.state === "active" && !busy) void finishSession(false);
  };
  update();
  countdownTimer = window.setInterval(update, 1_000);
}

function clearCountdown() {
  if (countdownTimer !== undefined) window.clearInterval(countdownTimer);
  countdownTimer = undefined;
}

function resetPage() {
  recorder?.dispose();
  recorder = undefined;
  userOnlyRecording = undefined;
  session = undefined;
  token = undefined;
  busy = false;
  renderedTurns.clear();
  messagesElement.replaceChildren();
  sessionData.classList.add("hidden");
  recordingDownload.classList.add("hidden");
  audioElement.classList.add("hidden");
  voiceControls.classList.add("hidden");
  timerElement.textContent = "02:00";
  clearCountdown();
  revokeUrls();
}

function revokeUrls() {
  if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
  if (recordingUrl) URL.revokeObjectURL(recordingUrl);
  currentAudioUrl = undefined;
  recordingUrl = undefined;
}

function preferredMimeType() {
  return ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

function fileNameFor(type: string) { return type.includes("mp4") ? "utterance.m4a" : "utterance.webm"; }
function formatBytes(value: number) { return value < 1024 ? `${value} bytes` : `${(value / 1024).toFixed(1)} KB`; }
function selectedMode(): Mode { return document.querySelector<HTMLInputElement>('input[name="mode"]:checked')?.value === "voice" ? "voice" : "text"; }
function setStatus(value: string) { statusElement.textContent = value; }
function errorMessage(error: unknown) { return error instanceof Error ? error.message : "Something went wrong."; }
function once(target: EventTarget, type: string): Promise<void> { return new Promise((resolve) => target.addEventListener(type, () => resolve(), { once: true })); }
function element<T extends HTMLElement>(id: string): T {
  const value = document.getElementById(id);
  if (!value) throw new Error(`Missing #${id}`);
  return value as T;
}
