import { useSyncExternalStore } from "react";
import type { Intensity, Mode } from "./types";

export type Theme = "night" | "dawn";

export interface Settings {
  theme: Theme;
  input: Mode;
  intensity: Intensity;
  captions: boolean;
  reduceMotion: boolean;
  untimed: boolean;
}

const KEY = "wick.settings";
const ONBOARDED = "wick.onboarded";
const listeners = new Set<() => void>();

const defaults = (): Settings => ({
  theme: matchMedia("(prefers-color-scheme: light)").matches ? "dawn" : "night",
  input: "voice",
  intensity: "realistic",
  captions: true,
  reduceMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
  untimed: false,
});

function load(): Settings {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "{}") as Partial<Settings>;
    return { ...defaults(), ...stored, theme: stored.theme === "dawn" ? "dawn" : "night" };
  } catch {
    return defaults();
  }
}

let current = load();

export function applySettings(s: Settings = current) {
  const root = document.documentElement;
  root.dataset.theme = s.theme;
  if (s.reduceMotion) root.dataset.motion = "still";
  else delete root.dataset.motion;
}

export function updateSettings(patch: Partial<Settings>) {
  current = { ...current, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {}
  applySettings();
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useSettings = () => useSyncExternalStore(subscribe, () => current);

export function isOnboarded() {
  try {
    return localStorage.getItem(ONBOARDED) === "true";
  } catch {
    return false;
  }
}

export function setOnboarded() {
  try {
    localStorage.setItem(ONBOARDED, "true");
  } catch {}
}
