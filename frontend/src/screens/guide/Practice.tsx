import { useState } from "react";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import type { StrategyInfo } from "../../lib/strategies";
import { Activity } from "./Activity";

interface PracticeProps {
  d: StrategyInfo;
  note: string;
  done: boolean;
  onSave: (note: string) => void;
}

const unquote = (s: string) => s.replace(/[“”]/g, "");

export function Practice({ d, note, done, onSave }: PracticeProps) {
  const [draft, setDraft] = useState(note);
  const [error, setError] = useState(false);
  const id = `${d.id}-note`;

  return (
    <Activity id={`${d.id}-practice`} n={4} title="Practice" done={done}>
      <form
        className="wk-field"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const text = draft.trim();
          setError(!text);
          if (text) onSave(text);
        }}
      >
        <label className="wk-field__label" htmlFor={id}>
          {d.practice}
        </label>
        <p className="wk-field__hint" id={`${id}-hint`}>
          A private note to yourself. It stays in this browser.
        </p>
        <div className="chips guide-starters" role="group" aria-label="Start from an example">
          {d.examples.map((x) => (
            <button key={x} type="button" className="pill pill--toggle" aria-pressed={draft === unquote(x)} onClick={() => setDraft(unquote(x))}>
              {x}
            </button>
          ))}
        </div>
        <textarea
          id={id}
          className="wk-field__control"
          rows={3}
          value={draft}
          placeholder={d.placeholder}
          aria-invalid={error || undefined}
          aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
          onChange={(e) => setDraft(e.target.value)}
        />
        {error && (
          <p className="wk-field__error" id={`${id}-error`}>
            <Icon name="danger" size={20} />
            Write a short answer to finish this step.
          </p>
        )}
        <Button type="submit" tone={done ? "frost" : "lantern"} className="self-start">
          {done ? "Save answer" : `Finish ${d.name}`}
        </Button>
      </form>
    </Activity>
  );
}
