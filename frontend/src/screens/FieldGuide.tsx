import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Button, ButtonLink } from "../components/Button";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/PageHead";
import { burst } from "../lib/effects";
import { guideSteps, pexels, strategies } from "../lib/strategies";
import type { Scenario } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { Complete } from "./guide/Complete";
import { Learn } from "./guide/Learn";
import { Overview } from "./guide/Overview";
import { Practice } from "./guide/Practice";
import { Recognize } from "./guide/Recognize";
import { SeeIt } from "./guide/SeeIt";
import { StepTrail } from "./guide/StepTrail";

const KEY = "wick.guide";
const DONE = guideSteps.length;

interface Progress {
  steps: number[];
  notes: string[];
}

function load(): Progress {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "null") as Progress | null;
    if (stored?.steps?.length === strategies.length) return stored;
  } catch {}
  return { steps: strategies.map(() => 0), notes: strategies.map(() => "") };
}

const OVERVIEW = -1;
const tabId = (i: number) => `guide-tab-${strategies[i]?.id ?? "overview"}`;

export function FieldGuide() {
  const { data } = useScenarios();
  const [progress, setProgress] = useState(load);
  const resume = Math.max(0, progress.steps.findIndex((s) => s < DONE));
  const [active, setActive] = useState(() => (progress.steps[0] > 0 ? resume : OVERVIEW));
  const isOpen = (i: number) => (i === 0 ? progress.steps[0] > 0 : progress.steps[i - 1] === DONE);
  const open = strategies.filter((_, i) => isOpen(i)).length;
  const opened = useRef(open);

  useEffect(() => {
    if (open > opened.current) {
      const tile = document.getElementById(tabId(open - 1));
      if (tile) burst(tile);
    }
    opened.current = open;
  }, [open]);
  const stepOf = (i: number) => (i === active && isOpen(i) ? Math.max(progress.steps[i], 1) : progress.steps[i]);

  const save = (i: number, step: number, note?: string) =>
    setProgress((p) => {
      const next = {
        steps: p.steps.map((s, j) => (j === i ? Math.max(s, step) : s)),
        notes: p.notes.map((n, j) => (j === i && note !== undefined ? note : n)),
      };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

  const go = (i: number) => {
    if (!isOpen(i)) return;
    setActive(i);
    document.getElementById(tabId(i))?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    const i = Number((e.target as HTMLElement).dataset.i);
    const count = strategies.length + 1;
    const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: OVERVIEW, End: count - 2 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    document.getElementById(tabId(((next + 1 + count) % count) - 1))?.focus();
  };

  const d = strategies[active];
  const trails = (d && data?.filter((s) => (s.strategies as number[]).includes(d.n))) || [];
  const done = progress.steps.filter((s) => s === DONE).length;

  return (
    <>
      <title>Field guide · Wick</title>
      <PageHead
        overline="Field guide"
        title="The five Ds"
        lead="Five short lessons, about a minute each: learn a strategy, see it, recognize it in three rounds, then practice it."
      />
      <div className="section guide">
        <p className="caption muted">Finish each D to open the next one.</p>
        <div className="guide-tiles" role="tablist" aria-label="The five Ds" onKeyDown={onKey}>
          <button
            id={tabId(OVERVIEW)}
            data-i={OVERVIEW}
            type="button"
            role="tab"
            aria-selected={active === OVERVIEW}
            aria-controls="guide-panel"
            tabIndex={active === OVERVIEW ? 0 : -1}
            className="guide-tile guide-tile--overview"
            onClick={() => setActive(OVERVIEW)}
          >
            <Icon name="guide" className="guide-tile__icon" />
            <span className="guide-tile__name">Overview</span>
            <span className="guide-tile__state">
              {done} of {strategies.length} done
            </span>
            <span className="guide-tile__bar" aria-hidden="true">
              <i style={{ width: `${(done / strategies.length) * 100}%` }} />
            </span>
          </button>
          {strategies.map((s, i) => {
            const step = stepOf(i);
            const locked = !isOpen(i);
            return (
              <button
                key={s.id}
                id={tabId(i)}
                data-i={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="guide-panel"
                tabIndex={i === active ? 0 : -1}
                className={`guide-tile wk-d--${s.id}`}
                aria-disabled={locked}
                onClick={() => go(i)}
              >
                <Icon name={locked ? "lock" : s.id} className="guide-tile__icon" />
                <span className="guide-tile__name">{s.name}</span>
                <span className="guide-tile__state">
                  {locked ? "Locked" : step === DONE ? "Done" : `${(step / DONE) * 100}%`}
                </span>
                <span className="guide-tile__bar" aria-hidden="true">
                  <i style={{ width: `${(step / DONE) * 100}%` }} />
                </span>
              </button>
            );
          })}
        </div>
        {d ? (
          <Module
            key={d.id}
            i={active}
            step={stepOf(active)}
            note={progress.notes[active]}
            trails={trails}
            onSave={(step, note) => save(active, step, note)}
            onGo={go}
          />
        ) : (
          <Overview steps={progress.steps} isOpen={isOpen} labelledBy={tabId(OVERVIEW)} onGo={go} />
        )}
      </div>
      <section className="guide-head" aria-labelledby="guide-lead">
        <figure className="guide-photo">
          <img src={pexels(6383164)} alt="" width={960} height={600} loading="lazy" />
          <figcaption>Photo: Liza Summer, Pexels</figcaption>
        </figure>
        <div className="guide-head__body">
          <div className="guide-head__id">
            <span className="guide-head__icon guide-lead__icon">
              <Icon name="info" />
            </span>
            <h2 className="heading" id="guide-lead">
              Follow the person’s lead.
            </h2>
          </div>
          <p className="muted prose">
            In a real moment, the five Ds are options, not a checklist. Choose based on safety, the context, and what
            the person affected wants.
          </p>
        </div>
      </section>
      <div className="actions">
        {active === OVERVIEW && done < strategies.length && (
          <Button
            tone="lantern"
            iconAfter="arrow"
            onClick={() => {
              if (progress.steps[0] === 0) save(0, 1);
              setActive(resume);
            }}
          >
            {progress.steps[0] > 0 ? "Continue with" : "Start with"} {strategies[resume].name}
          </Button>
        )}
        <ButtonLink
          tone={active === OVERVIEW && done < strategies.length ? "quiet" : "lantern"}
          icon="trail"
          to="/trails"
        >
          Choose a trail to practice
        </ButtonLink>
      </div>
    </>
  );
}

interface ModuleProps {
  i: number;
  step: number;
  note: string;
  trails: Scenario[];
  onSave: (step: number, note?: string) => void;
  onGo: (i: number) => void;
}

function Module({ i, step, note, trails, onSave, onGo }: ModuleProps) {
  const d = strategies[i];
  const next = strategies[i + 1];
  const [celebrate, setCelebrate] = useState(false);
  const [focus, setFocus] = useState("");

  useEffect(() => {
    if (focus) document.getElementById(focus)?.focus();
  }, [focus]);

  return (
    <div className={`guide-module wk-d--${d.id}`} id="guide-panel" role="tabpanel" aria-labelledby={tabId(i)}>
      <header className="guide-head">
        <figure className="guide-photo">
          <img
            src={pexels(d.photo.id)}
            alt=""
            width={960}
            height={600}
          />
          <figcaption>Photo: {d.photo.by}, Pexels</figcaption>
        </figure>
        <div className="guide-head__body">
        <div className="guide-head__id">
          <span className="guide-head__icon">
            <Icon name={d.id} />
          </span>
          <div>
            <p className="overline eyebrow">
              Strategy {d.n} of {strategies.length}
            </p>
            <h2 className="heading">{d.name}</h2>
            <p className="muted">{d.meaning}</p>
          </div>
        </div>
        <StepTrail step={step} label={`${d.name}: ${step} of ${DONE} steps done`} />
        </div>
      </header>

      <Learn
        d={d}
        done={step >= 2}
        onNext={
          step < 2
            ? () => {
                onSave(2);
                setFocus(`${d.id}-see`);
              }
            : undefined
        }
      />
      {step >= 2 && <SeeIt d={d} done trails={trails} />}

          {step >= 2 && (
            <Recognize
              d={d}
              done={step >= 3}
              onDone={() => {
                onSave(3);
                setFocus(`${d.id}-practice`);
              }}
            />
          )}
          {step >= 3 && (
            <Practice
              d={d}
              note={note}
              done={step >= DONE}
              onSave={(text) => {
                setCelebrate(step < DONE);
                onSave(DONE, text);
              }}
            />
          )}
          {step >= DONE && (
            <Complete d={d} next={next} trail={trails[0]} celebrate={celebrate} onNext={next ? () => onGo(i + 1) : undefined} />
          )}
    </div>
  );
}
