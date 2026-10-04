import type { GeneratedScenario, Scenario } from "./types";

const storageKey = "wick.custom-scenarios.v1";

interface StoredScenario extends GeneratedScenario {
  createdAt: string;
}

export function saveCustomScenario(generated: GeneratedScenario) {
  const next = [
    { ...generated, createdAt: new Date().toISOString() },
    ...stored().filter((item) => item.scenario.id !== generated.scenario.id),
  ].slice(0, 5);
  sessionStorage.setItem(storageKey, JSON.stringify(next));
}

export function customScenarios(): Scenario[] {
  return stored().map((item) => item.scenario);
}

export function customScenarioToken(scenarioId: string): string | undefined {
  return stored().find((item) => item.scenario.id === scenarioId)?.scenarioToken;
}

function stored(): StoredScenario[] {
  try {
    const value = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]") as StoredScenario[];
    return Array.isArray(value)
      ? value.filter((item) => item?.scenario?.id?.startsWith("custom-") && typeof item.scenarioToken === "string")
      : [];
  } catch {
    return [];
  }
}
