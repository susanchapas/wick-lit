import { Conversation, type Conversation as ConversationInstance } from "@elevenlabs/client";
import "./style.css";

type Mode = "text" | "voice";
type SessionState =
  | "authorized"
  | "conversing"
  | "processing"
  | "completed"
  | "stepped_out"
  | "disconnected"
  | "failed"
  | "expired";

interface StartResponse {
  sessionId: string;
  sessionToken: string;
  mode: Mode;
  state: SessionState;
  conversationDeadline: string;
  authorization:
    | { type: "signed_url"; signedUrl: string; expiresInSeconds: number }
    | { type: "conversation_token"; conversationToken: string; expiresInSeconds: number };
}

interface ResultResponse {
  sessionId: string;
  state: SessionState;
  retryAfterSeconds?: number;
  transcript?: Array<{ id: string; role: "user" | "agent"; text: string }>;
  feedback?: {
    dimensions: Record<string, {
      status: string;
      rationale: string;
      evidence: Array<{ turnId: string; quote: string }>;
    }>;
    identifiedStrategies: Array<{ number: number; name: string }>;
    strength: string;
    nextStep: string;
    summary: string;
  };
}

const startButton = element<HTMLButtonElement>("start");
const finishButton = element<HTMLButtonElement>("finish");
const stepOutButton = element<HTMLButtonElement>("step-out");
const retryTextButton = element<HTMLButtonElement>("retry-text");
const statusElement = element<HTMLElement>("status");
const timerElement = element<HTMLElement>("timer");
const messagesElement = element<HTMLOListElement>("messages");
const messageForm = element<HTMLFormElement>("message-form");
const messageInput = element<HTMLInputElement>("message");
const sendButton = element<HTMLButtonElement>("send");
const feedbackPanel = element<HTMLElement>("feedback-panel");
const feedbackElement = element<HTMLElement>("feedback");
const modePicker = element<HTMLFieldSetElement>("mode-picker");

let providerConversation: ConversationInstance | undefined;
let session: StartResponse | undefined;
let intentionalEnd = false;
let currentProviderMode: "speaking" | "listening" = "listening";
let deadlineTimer: number | undefined;
let countdownTimer: number | undefined;
const renderedMessages = new Map<string, HTMLLIElement>();
const optimisticUserMessages: Array<{ id: string; text: string; confirmed: boolean }> = [];
let localMessageNumber = 0;

startButton.addEventListener("click", () => void startSelectedMode());
retryTextButton.addEventListener("click", () => {
  const textChoice = document.querySelector<HTMLInputElement>('input[name="mode"][value="text"]');
  if (textChoice) textChoice.checked = true;
  retryTextButton.classList.add("hidden");
  void startSelectedMode();
});
finishButton.addEventListener("click", () => void finishSession());
stepOutButton.addEventListener("click", () => void stepOut());
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text || !providerConversation || session?.mode !== "text") return;
  const localId = `user-local-${++localMessageNumber}`;
  optimisticUserMessages.push({ id: localId, text, confirmed: false });
  renderMessage(localId, "user", text);
  providerConversation.sendUserMessage(text);
  messageInput.value = "";
  messageInput.focus();
});
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    messageForm.requestSubmit();
  }
});
messageInput.addEventListener("input", () => providerConversation?.sendUserActivity());
window.addEventListener("beforeunload", () => {
  stopMedia();
  if (providerConversation) void providerConversation.endSession();
  if (session && !intentionalEnd) {
    void api(`/sessions/${session.sessionId}/disconnect`, {
      method: "POST",
      keepalive: true,
    }).catch(() => undefined);
  }
});

async function startSelectedMode() {
  resetPage();
  const mode = selectedMode();
  setStatus(mode === "text" ? "Authorizing text session…" : "Waiting for microphone permission…");
  setSetupDisabled(true);

  try {
    session = await api<StartResponse>("/sessions", {
      method: "POST",
      body: JSON.stringify({ scenarioId: "ask-a-friend", mode }),
    }, false);
    startCountdown(session.conversationDeadline);

    const callbacks = {
      onConnect: ({ conversationId }: { conversationId: string }) => {
        void attachConversation(conversationId).catch((error) => setStatus(errorMessage(error)));
      },
      onMessage: ({ message, role, event_id }: { message: string; role: "user" | "agent"; event_id: number }) => {
        if (role === "user") {
          const optimistic = optimisticUserMessages.find(
            (item) => !item.confirmed && item.text === message,
          );
          if (optimistic) {
            optimistic.confirmed = true;
            return;
          }
        }
        renderMessage(`${role}-${event_id}`, role, message);
      },
      onStatusChange: ({ status }: { status: string }) => setStatus(statusLabel(status)),
      onModeChange: ({ mode: providerMode }: { mode: "speaking" | "listening" }) => {
        currentProviderMode = providerMode;
        if (session?.mode === "voice") setStatus(providerMode === "speaking" ? "Alex is speaking" : "Listening");
      },
      onError: () => setStatus("Conversation error"),
      onDisconnect: (details: { reason: string }) => {
        stopMedia();
        if (!intentionalEnd && session) {
          setStatus("Disconnected unexpectedly");
          setConversationControls(false);
          void api(`/sessions/${session.sessionId}/disconnect`, { method: "POST" }).catch(() => undefined);
        } else if (details.reason === "error") {
          setStatus("Conversation ended with an error");
        }
      },
    };

    if (session.authorization.type === "signed_url") {
      providerConversation = await Conversation.startSession({
        signedUrl: session.authorization.signedUrl,
        connectionType: "websocket",
        textOnly: true,
        overrides: { conversation: { textOnly: true } },
        ...callbacks,
      });
    } else {
      providerConversation = await Conversation.startSession({
        conversationToken: session.authorization.conversationToken,
        connectionType: "webrtc",
        textOnly: false,
        ...callbacks,
      });
    }
    await attachConversation(providerConversation.getId());
    setConversationControls(true);
    setStatus(mode === "text" ? "Connected — type your response" : "Connected — microphone active");
  } catch (error) {
    const denied = isMicrophoneDenial(error);
    setStatus(denied ? "Microphone access was denied" : errorMessage(error));
    if (session) {
      await api(`/sessions/${session.sessionId}/disconnect`, { method: "POST" }).catch(() => undefined);
    }
    intentionalEnd = true;
    await endProviderConversation();
    intentionalEnd = false;
    session = undefined;
    stopMedia();
    setSetupDisabled(false);
    if (denied) retryTextButton.classList.remove("hidden");
  }
}

async function attachConversation(providerConversationId: string) {
  if (!session) return;
  await api(`/sessions/${session.sessionId}/connect`, {
    method: "POST",
    body: JSON.stringify({ providerConversationId }),
  });
}

async function finishSession() {
  if (!session || intentionalEnd) return;
  intentionalEnd = true;
  setStatus("Ending conversation…");
  setConversationControls(false);
  clearTimers();
  await endProviderConversation();
  try {
    const result = await api<ResultResponse>(`/sessions/${session.sessionId}/finish`, {
      method: "POST",
    });
    await handleResult(result);
  } catch (error) {
    setStatus(errorMessage(error));
  }
}

async function handleResult(result: ResultResponse): Promise<void> {
  if (result.state === "processing") {
    setStatus("Transcript is processing…");
    const delay = Math.max(1, result.retryAfterSeconds ?? 3) * 1000;
    await new Promise((resolve) => window.setTimeout(resolve, delay));
    if (!session) return;
    const next = await api<ResultResponse>(`/sessions/${session.sessionId}/result`);
    return handleResult(next);
  }
  if (result.state === "completed" && result.feedback) {
    setStatus("Feedback ready");
    renderFeedback(result.feedback);
    setSetupDisabled(false);
    return;
  }
  setStatus(`Session ended: ${result.state.replaceAll("_", " ")}`);
}

async function stepOut() {
  if (!session || intentionalEnd) return;
  intentionalEnd = true;
  setConversationControls(false);
  clearTimers();
  await endProviderConversation();
  try {
    await api(`/sessions/${session.sessionId}/step-out`, { method: "POST" });
    setStatus("Stepped out — no feedback was created");
    setSetupDisabled(false);
  } catch (error) {
    setStatus(errorMessage(error));
  }
}

async function endProviderConversation() {
  try {
    await providerConversation?.endSession();
  } finally {
    providerConversation = undefined;
    stopMedia();
  }
}

function startCountdown(deadline: string) {
  const update = () => {
    const remaining = Math.max(0, Date.parse(deadline) - Date.now());
    const seconds = Math.ceil(remaining / 1000);
    timerElement.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  };
  update();
  countdownTimer = window.setInterval(update, 1000);
  deadlineTimer = window.setTimeout(() => void finishAfterCurrentResponse(), Math.max(0, Date.parse(deadline) - Date.now()));
}

async function finishAfterCurrentResponse() {
  if (!session || intentionalEnd) return;
  setStatus("Time is up — waiting for Alex to finish…");
  messageInput.disabled = true;
  sendButton.disabled = true;
  const graceDeadline = Date.now() + 30_000;
  while (currentProviderMode === "speaking" && Date.now() < graceDeadline) {
    await new Promise((resolve) => window.setTimeout(resolve, 350));
  }
  await finishSession();
}

function renderMessage(id: string, role: "user" | "agent", text: string) {
  let item = renderedMessages.get(id);
  if (!item) {
    item = document.createElement("li");
    item.className = `message ${role}`;
    item.innerHTML = `<span class="speaker"></span><span class="message-text"></span>`;
    renderedMessages.set(id, item);
    messagesElement.append(item);
  }
  item.querySelector<HTMLElement>(".speaker")!.textContent = role === "agent" ? "Alex" : "You";
  item.querySelector<HTMLElement>(".message-text")!.textContent = text;
  item.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderFeedback(feedback: NonNullable<ResultResponse["feedback"]>) {
  const labels: Record<string, string> = {
    clearAction: "Clear action",
    safety: "Safety",
    supportAndChoice: "Support and choice",
  };
  feedbackElement.replaceChildren();
  const summary = document.createElement("p");
  summary.textContent = feedback.summary;
  feedbackElement.append(summary);

  const grid = document.createElement("div");
  grid.className = "feedback-grid";
  for (const [key, dimension] of Object.entries(feedback.dimensions)) {
    const card = document.createElement("article");
    card.className = "feedback-card";
    const heading = document.createElement("h3");
    heading.textContent = labels[key] ?? key;
    const status = document.createElement("p");
    status.className = "status-value";
    status.textContent = dimension.status.replaceAll("_", " ");
    const rationale = document.createElement("p");
    rationale.textContent = dimension.rationale;
    card.append(heading, status, rationale);
    for (const evidence of dimension.evidence) {
      const quote = document.createElement("blockquote");
      quote.textContent = `“${evidence.quote}”`;
      card.append(quote);
    }
    grid.append(card);
  }
  feedbackElement.append(grid);
  const strategies = document.createElement("p");
  strategies.textContent = feedback.identifiedStrategies.length
    ? `Five Ds identified: ${feedback.identifiedStrategies.map((item) => `${item.number} ${item.name}`).join(", ")}`
    : "Five Ds identified: not enough evidence yet";
  const strength = document.createElement("p");
  strength.textContent = `Strength: ${feedback.strength}`;
  const next = document.createElement("p");
  next.textContent = `Next step: ${feedback.nextStep}`;
  feedbackElement.append(strategies, strength, next);
  feedbackPanel.classList.remove("hidden");
}

async function api<T = unknown>(path: string, init: RequestInit = {}, authenticated = true): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set("content-type", "application/json");
  if (authenticated && session) headers.set("authorization", `Bearer ${session.sessionToken}`);
  const response = await fetch(`/api${path}`, { ...init, headers });
  const body = await response.json().catch(() => ({})) as { error?: { message?: string } };
  if (!response.ok && response.status !== 202) {
    throw new Error(body.error?.message ?? `Request failed (${response.status})`);
  }
  return body as T;
}

function setConversationControls(active: boolean) {
  finishButton.disabled = !active;
  stepOutButton.disabled = !active;
  const textActive = active && session?.mode === "text";
  messageInput.disabled = !textActive;
  sendButton.disabled = !textActive;
  if (textActive) messageInput.focus();
}

function setSetupDisabled(disabled: boolean) {
  startButton.disabled = disabled;
  for (const input of modePicker.querySelectorAll<HTMLInputElement>("input")) input.disabled = disabled;
}

function resetPage() {
  intentionalEnd = false;
  providerConversation = undefined;
  session = undefined;
  currentProviderMode = "listening";
  renderedMessages.clear();
  optimisticUserMessages.length = 0;
  localMessageNumber = 0;
  messagesElement.replaceChildren();
  feedbackPanel.classList.add("hidden");
  feedbackElement.replaceChildren();
  retryTextButton.classList.add("hidden");
  timerElement.textContent = "02:00";
  clearTimers();
}

function clearTimers() {
  if (deadlineTimer !== undefined) window.clearTimeout(deadlineTimer);
  if (countdownTimer !== undefined) window.clearInterval(countdownTimer);
  deadlineTimer = undefined;
  countdownTimer = undefined;
}

function stopMedia() {
  for (const media of document.querySelectorAll<HTMLMediaElement>("audio, video")) {
    media.pause();
    if (media.srcObject instanceof MediaStream) {
      for (const track of media.srcObject.getTracks()) track.stop();
      media.srcObject = null;
    }
  }
}

function selectedMode(): Mode {
  return document.querySelector<HTMLInputElement>('input[name="mode"]:checked')?.value === "voice"
    ? "voice"
    : "text";
}

function setStatus(value: string) { statusElement.textContent = value; }
function statusLabel(value: string) {
  return value === "connected" ? "Connected" : value === "connecting" ? "Connecting…" : "Disconnected";
}
function errorMessage(error: unknown) { return error instanceof Error ? error.message : "Something went wrong."; }
function isMicrophoneDenial(error: unknown) {
  return error instanceof DOMException && ["NotAllowedError", "PermissionDeniedError"].includes(error.name)
    || errorMessage(error).toLowerCase().includes("permission");
}
function element<T extends HTMLElement>(id: string): T {
  const value = document.getElementById(id);
  if (!value) throw new Error(`Missing #${id}`);
  return value as T;
}
