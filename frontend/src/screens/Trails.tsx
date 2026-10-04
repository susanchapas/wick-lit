import { useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ButtonLink } from "../components/Button";
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
  const [mark, setMark] = useState<CSSProperties>();
  const list = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const place = () => {
      const tab = el.children[active] as HTMLElement;
      setMark({ left: tab.offsetLeft, top: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);

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
      <section className="wk-card panel scenario-studio-cta" aria-labelledby="scenario-studio-title">
        <div className="section">
          <p className="eyebrow overline">Scenario studio</p>
          <h2 id="scenario-studio-title" className="heading">Practice a situation from your world.</h2>
          <p className="muted prose">
            Describe a workplace or campus challenge and Wick will generate the setting, characters, dialogue, and coaching path.
          </p>
        </div>
        <ButtonLink tone="lantern" icon="flame" iconAfter="arrow" to="/trails/create">Create a scenario</ButtonLink>
      </section>
      <div ref={list} className="wk-tabs__list" role="tablist" aria-label="Filter trails" onKeyDown={onKey}>
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
        <span className="wk-tabs__mark" style={mark} aria-hidden="true" />
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
