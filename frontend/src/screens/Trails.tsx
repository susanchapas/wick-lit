import { useState, type KeyboardEvent } from "react";
import { PageHead } from "../components/PageHead";
import { TrailList } from "../components/TrailList";
import type { Scenario } from "../lib/types";

const online = (s: Scenario) => /chat|online/i.test(s.location);

const filters = [
  { id: "all", label: "All trailheads", test: () => true },
  { id: "person", label: "In person", test: (s: Scenario) => !online(s) },
  { id: "online", label: "Online", test: online },
];

export function Trails() {
  const [active, setActive] = useState(0);

  const onKey = (e: KeyboardEvent) => {
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: filters.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + filters.length) % filters.length;
    setActive(i);
    document.getElementById(`tab-${filters[i].id}`)?.focus();
  };

  return (
    <>
      <title>Trails · Wick</title>
      <PageHead
        overline="Trails"
        title="Choose a trailhead to practice"
        lead="Every trail starts with a content note. No trail is locked. Each one is ready to open."
      />
      <div className="wk-tabs__list" role="tablist" aria-label="Filter trails" onKeyDown={onKey}>
        {filters.map((f, i) => (
          <button
            key={f.id}
            id={`tab-${f.id}`}
            type="button"
            role="tab"
            className="wk-tabs__tab"
            aria-selected={i === active}
            aria-controls="trail-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div id="trail-panel" role="tabpanel" aria-labelledby={`tab-${filters[active].id}`}>
        <TrailList filter={filters[active].test} />
      </div>
      <p className="caption muted prose">
        Each trailhead lists a short setup, the people in it, about how long it takes, the location, and the numbered
        strategies that match the Field guide. Finished practice is marked only as Lantern lit. Feedback stays private in the
        result at the end of each session.
      </p>
    </>
  );
}
