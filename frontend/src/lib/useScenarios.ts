import { useEffect, useState } from "react";
import { getScenarios } from "./api";
import { customScenarios } from "./customScenarios";
import type { Scenario } from "./types";

let cache: Promise<Scenario[]> | null = null;

export function useScenarios() {
  const [state, setState] = useState<{ data?: Scenario[]; error?: unknown }>({});
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    (cache ??= getScenarios()).then(
      (data) => live && setState({ data: [...customScenarios(), ...data] }),
      (error) => {
        cache = null;
        if (live) setState({ error });
      },
    );
    return () => {
      live = false;
    };
  }, [attempt]);

  return {
    ...state,
    retry: () => {
      setState({});
      setAttempt((a) => a + 1);
    },
  };
}
