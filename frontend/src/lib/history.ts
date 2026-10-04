import { useSyncExternalStore } from "react";

export interface Lantern {
  id: string;
  scenarioId: string;
  title: string;
  strategies: string[];
  completedAt: string;
  score?: number;
  reflection?: string;
}

const KEY = "wick.history";
const listeners = new Set<() => void>();

function load(): Lantern[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

let current = load();

function save(next: Lantern[]) {
  current = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

export const addLantern = (l: Lantern) => {
  const existing = current.find((candidate) => candidate.id === l.id);
  if (!existing) {
    save([l, ...current]);
    return;
  }
  const updated = { ...existing, ...l, reflection: existing.reflection ?? l.reflection };
  if (JSON.stringify(updated) !== JSON.stringify(existing)) {
    save(current.map((candidate) => candidate.id === l.id ? updated : candidate));
  }
};

export const setReflection = (id: string, reflection: string) =>
  save(current.map((l) => (l.id === id ? { ...l, reflection } : l)));

export const clearHistory = () => save([]);

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useHistory = () => useSyncExternalStore(subscribe, () => current);

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

export function streak(history: Lantern[], today = new Date()) {
  const lit = new Set(history.map((l) => dayKey(new Date(l.completedAt))));
  let start = lit.has(dayKey(today)) ? today : addDays(today, -1);
  const days: Date[] = [];
  while (lit.has(dayKey(start))) {
    days.unshift(start);
    start = addDays(start, -1);
  }
  const monday = addDays(today, -((today.getDay() + 6) % 7));
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(monday, i);
    return { date: d, lit: lit.has(dayKey(d)), today: dayKey(d) === dayKey(today) };
  });
  return { days, week, litToday: lit.has(dayKey(today)) };
}
