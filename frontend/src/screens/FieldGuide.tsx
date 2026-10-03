import { useEffect, useState, type KeyboardEvent } from "react";
import { Button, ButtonLink } from "../components/Button";
import { Notice } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/PageHead";
import { guideSteps, strategies } from "../lib/strategies";
import type { Scenario } from "../lib/types";
import { useScenarios } from "../lib/useScenarios";
import { Complete } from "./guide/Complete";
import { Learn } from "./guide/Learn";
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

const tabId = (i: number) => `guide-tab-${strategies[i].id}`;

export function FieldGuide() {
  const { data } = useScenarios();
  const [progress, setProgress] = useState(load);
  const resume = Math.max(0, progress.steps.findIndex((s) => s < DONE));
  const [active, setActive] = useState(resume);
  const isOpen = (i: number) => i === 0 || progress.steps[i - 1] === DONE;
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
    setActive(i);
    document.getElementById(tabId(i))?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    const i = Number((e.target as HTMLElement).dataset.i);
    const last = strategies.length - 1;
    const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    document.getElementById(tabId((next + strategies.length) % strategies.length))?.focus();
  };

  const d = strategies[active];
  const trails = data?.filter((s) => (s.strategies as number[]).includes(d.n)) ?? [];

  return (
    <>
      <title>Field guide · Wick</title>
      <PageHead
        overline="Field guide"
        title="The five Ds"
        lead="Five short lessons, about a minute each: learn a strategy, see it, recognize it in three rounds, then practice it."
      />
      <div className="section guide">
        <p className="caption muted">Read any D at any time. Finish each D to open practice for the next one.</p>
        <div className="guide-tiles" role="tablist" aria-label="The five Ds" onKeyDown={onKey}>
          {strategies.map((s, i) => {
            const step = stepOf(i);
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
                data-locked={!isOpen(i) || undefined}
                onClick={() => setActive(i)}
              >
                <Icon name={s.id} className="guide-tile__icon" />
                <span className="guide-tile__name">{s.name}</span>
                <span className="guide-tile__state">
                  {!isOpen(i) ? "Locked" : step === DONE ? "Done" : `${(step / DONE) * 100}%`}
                </span>
                <span className="guide-tile__bar" aria-hidden="true">
                  <i style={{ width: `${(step / DONE) * 100}%` }} />
                </span>
              </button>
            );
          })}
        </div>
        <Module
          key={d.id}
          i={active}
          step={stepOf(active)}
          note={progress.notes[active]}
          locked={!isOpen(active)}
          trails={trails}
          onSave={(step, note) => save(active, step, note)}
          onGo={go}
          resume={resume}
        />
      </div>
      <Notice tone="info" title="Follow the person’s lead.">
        In a real moment, the five Ds are options, not a checklist. Choose based on safety, the context, and what the
        person affected wants.
      </Notice>
      <ButtonLink tone="lantern" icon="trail" to="/trails" className="self-start">
        Choose a trail to practice
      </ButtonLink>
    </>
  );
}

interface ModuleProps {
  i: number;
  step: number;
  note: string;
  locked: boolean;
  trails: Scenario[];
  resume: number;
  onSave: (step: number, note?: string) => void;
  onGo: (i: number) => void;
}

function Module({ i, step, note, locked, trails, resume, onSave, onGo }: ModuleProps) {
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
            src={`https://images.pexels.com/photos/${d.photo.id}/pexels-photo-${d.photo.id}.jpeg?auto=compress&cs=tinysrgb&w=960&h=600&fit=crop`}
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
        {!locked && <StepTrail step={step} label={`${d.name}: ${step} of ${DONE} steps done`} />}
        </div>
      </header>

      <Learn
        d={d}
        done={!locked && step >= 2}
        onNext={
          !locked && step < 2
            ? () => {
                onSave(2);
                setFocus(`${d.id}-see`);
              }
            : undefined
        }
      />
      {(locked || step >= 2) && <SeeIt d={d} done={!locked} trails={trails} />}

      {locked ? (
        <section className="wk-card guide-act guide-locked" aria-labelledby={`${d.id}-locked`}>
          <h3 className="aside" id={`${d.id}-locked`}>
            Recognize and practice
          </h3>
          <p className="muted prose">
            These open when you finish {strategies[resume].name}. You can read about {d.name} now.
          </p>
          <Button tone="quiet" iconAfter="arrow" className="self-start" onClick={() => onGo(resume)}>
            Go to {strategies[resume].name}
          </Button>
        </section>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
