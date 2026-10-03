import type { ApiErrorBody, ChatResponse, Scenario, ScoreResponse, SpeechToken } from "./types";

export const scenarios: Scenario[] = [
  {
    id: "upstairs-invite",
    title: "The Upstairs Invite",
    setup: "Your friend Maya has had a lot to drink. A guy she just met is steering her toward the stairs.",
    difficulty: "Medium",
    location: "House party",
    minutes: 1,
    characters: ["Dylan", "Maya"],
    strategies: [2, 3, 1],
    contentTags: ["Alcohol", "Pressure", "Unwanted attention"],
    contentNote: "Dylan keeps pushing Maya to go upstairs with him while she is drunk. The scene ends before anything happens upstairs.",
    openingAudio: "/content/audio/upstairs-invite-opening.mp3",
  },
  {
    id: "unattended-drink",
    title: "The Unattended Drink",
    setup: "At a crowded bar, you see a man drop something into Priya's drink while she is in the bathroom.",
    difficulty: "Hard",
    location: "Bar",
    minutes: 1,
    characters: ["Rob", "Priya", "Bartender"],
    strategies: [3, 1, 2],
    contentTags: ["Alcohol", "Drink spiking"],
    contentNote: "Someone tampers with a drink. You decide what to do before Priya drinks it.",
    openingAudio: "/content/audio/unattended-drink-opening.mp3",
  },
  {
    id: "library-regular",
    title: "The Library Regular",
    setup: "A man who studies at the library every night keeps sitting next to Ana and asking for her number. She has moved tables twice.",
    difficulty: "Easy",
    location: "Campus library",
    minutes: 1,
    characters: ["Greg", "Ana"],
    strategies: [2, 4, 3],
    contentTags: ["Harassment", "Unwanted attention"],
    contentNote: "Greg follows Ana between tables and will not take no for an answer. No one touches anyone.",
    openingAudio: "/content/audio/library-regular-opening.mp3",
  },
  {
    id: "group-chat",
    title: "The Group Chat",
    setup: "Jordan posts a private photo of a classmate in your friends' group chat. People start reacting.",
    difficulty: "Medium",
    location: "Group chat",
    minutes: 1,
    characters: ["Jordan", "Alex"],
    strategies: [1, 4, 5],
    contentTags: ["Image abuse", "Peer pressure"],
    contentNote: "A private photo is shared without consent. The photo is described, never shown.",
    openingAudio: "/content/audio/group-chat-opening.mp3",
  },
];

export const chat: ChatResponse = {
  replies: [
    { speaker: "Dylan", text: "She's fine, we'll be right back." },
    { speaker: "Maya", text: "Wait, Jess is here?" },
  ],
  turn: 2,
  ended: false,
  endReason: null,
};

export const score: ScoreResponse = {
  total: 82,
  headline: "Effective, with room to grow",
  dimensions: [
    { name: "Noticed", score: 18, strategy: "Distract", note: "You used Distract by saying her roommate was looking for her. Next time, say it before Dylan reaches the stairs." },
    { name: "Directness", score: 15, strategy: "Direct", note: "You used Direct when you said \"She's coming with me.\" Next time, say Maya's name first so she knows you are talking to her." },
    { name: "Safety", score: 17, strategy: "Delegate", note: "You used Delegate by asking Jess to come over. Next time, stay in the busy room so you are never alone with Dylan." },
    { name: "De-escalation", score: 16, strategy: "Distract", note: "You used Distract and kept your tone light when Dylan pushed back. Next time, give him an easy way to leave without losing face." },
    { name: "Follow-through", score: 16, strategy: "Delay", note: "You used Delay by asking Maya if she was okay. Next time, stay with her until her friend arrives." },
  ],
  strengths: ["You stepped in early, before Maya reached the stairs.", "You gave Maya a reason to leave that did not blame her."],
  improvements: ["Stay with Maya after she leaves Dylan.", "Bring in a friend sooner when Dylan pushes back."],
  exampleLine: "Hey Maya, I need you in the bathroom right now.",
  scoredBy: "gemini",
};

export const speechToken: SpeechToken = { token: "sample-token", region: "eastus2" };

export const voiceUnavailable: ApiErrorBody = { error: "voice_unavailable" };
