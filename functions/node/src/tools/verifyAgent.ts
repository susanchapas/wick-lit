import { verifyAgentDefinition } from "../providers/elevenLabs";
import { readFileSync } from "node:fs";

function loadLocalSettings() {
  try {
    const settings = JSON.parse(readFileSync("local.settings.json", "utf8")) as {
      Values?: Record<string, string>;
    };
    for (const [name, value] of Object.entries(settings.Values ?? {})) {
      if (process.env[name] === undefined) process.env[name] = value;
    }
  } catch {
    // Azure and CI provide environment variables directly.
  }
}

async function main() {
  loadLocalSettings();
  const result = await verifyAgentDefinition();
  console.log(
    JSON.stringify({
      status: "ok",
      scenarioVersion: "ask-a-friend-v1",
      providerVersionId: result.versionId ?? null,
    }),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Agent verification failed.";
  console.error(message);
  process.exitCode = 1;
});
