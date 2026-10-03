import { useState, type ReactNode } from "react";
import { Button } from "../../components/Button";
import { Answers } from "../../components/Controls";
import { Icon } from "../../components/Icon";
import type { StrategyInfo } from "../../lib/strategies";
import { Activity } from "./Activity";

interface Question {
  legend: ReactNode;
  hint?: string;
  options: { value: string; label: ReactNode }[];
  answer: string[];
  multi?: boolean;
}

interface Round {
  title: string;
  intro: ReactNode;
  why: string;
  questions: Question[];
}

const rounds = (d: StrategyInfo): Round[] => [
  {
    title: "Pick the response",
    intro: <span className="well">{d.situation}</span>,
    why: d.why,
    questions: [
      {
        legend: d.question,
        options: d.options.map((label, j) => ({ value: String(j), label })),
        answer: [String(d.answer)],
      },
    ],
  },
  {
    title: "Good fit or not",
    intro: `Decide if ${d.name} fits each moment.`,
    why: d.when,
    questions: d.fit.map((f) => ({
      legend: f.text,
      options: [
        { value: "yes", label: "Good fit" },
        { value: "no", label: "Not a fit" },
      ],
      answer: [f.ok ? "yes" : "no"],
    })),
  },
  {
    title: "Spot it",
    intro: `Some of these responses are ${d.name}. Some are not.`,
    why: `Each one you checked is ${d.name}: ${d.definition.charAt(0).toLowerCase()}${d.definition.slice(1)}`,
    questions: [
      {
        legend: `Which of these are ${d.name}?`,
        hint: "Check every one that fits.",
        multi: true,
        options: d.spot.map((s, j) => ({ value: String(j), label: s.text })),
        answer: d.spot.map((s, j) => (s.ok ? String(j) : "")).filter(Boolean),
      },
    ],
  },
];

const same = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));

interface RecognizeProps {
  d: StrategyInfo;
  done: boolean;
  onDone: () => void;
}

export function Recognize({ d, done, onDone }: RecognizeProps) {
  const all = rounds(d);
  const [round, setRound] = useState(done ? all.length : 0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [checked, setChecked] = useState(false);
  const r = all[round];

  const go = (next: number) => {
    setAnswers([]);
    setChecked(false);
    setRound(next);
    if (next === all.length) onDone();
  };

  if (!r)
    return (
      <Activity id={`${d.id}-recognize`} n={3} title="Recognize" done>
        <p className="prose">You recognized {d.name} in all three rounds.</p>
        <Button tone="quiet" icon="replay" className="self-start" onClick={() => go(0)}>
          Play the rounds again
        </Button>
      </Activity>
    );

  const given = (j: number) => answers[j] ?? [];
  const right = r.questions.map((q, j) => same(given(j), q.answer));
  const missing = r.questions.some((_, j) => !given(j).length);
  const solved = checked && right.every(Boolean);
  const score = right.filter(Boolean).length;
  const feedback = !checked
    ? ""
    : missing
      ? "Answer each question, then check again."
      : solved
        ? `Right. ${r.why}`
        : r.questions.length === 1
          ? `Not quite. Look again for the ${r.questions[0].multi ? "ones that are" : "one that is"} ${d.name}.`
          : `${score} of ${r.questions.length} are right. Change the ones marked “Try again.”`;

  const answer = (j: number, v: string[]) => {
    if (solved) return;
    setAnswers((a) => Object.assign([...a], { [j]: v }));
    setChecked(false);
  };

  return (
    <Activity id={`${d.id}-recognize`} n={3} title="Recognize" done={done}>
      <div className="quiz" key={round}>
        <p className="overline eyebrow">
          Round {round + 1} of {all.length} · {r.title}
        </p>
        <p className="prose">{r.intro}</p>
        <div className="quiz__qs">
          {r.questions.map((q, j) => {
            const state = checked && given(j).length ? (right[j] ? "right" : "wrong") : undefined;
            return (
              <div className="quiz-q" data-state={state} key={j}>
                <Answers legend={q.legend} hint={q.hint} options={q.options} multi={q.multi} value={given(j)} onChange={(v) => answer(j, v)} />
                {state && r.questions.length > 1 && (
                  <p className="quiz-q__state">
                    <Icon name={state === "right" ? "check" : "info"} size={20} />
                    {state === "right" ? "Right" : "Try again"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <p className="prose" aria-live="polite">
          {feedback}
        </p>
        {solved ? (
          <Button className="self-start" iconAfter="arrow" onClick={() => go(round + 1)}>
            {round + 1 < all.length ? "Next round" : `Finish recognizing ${d.name}`}
          </Button>
        ) : (
          <Button className="self-start" onClick={() => setChecked(true)}>
            Check answers
          </Button>
        )}
      </div>
    </Activity>
  );
}
