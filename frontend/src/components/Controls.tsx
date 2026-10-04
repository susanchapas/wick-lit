import { useId, type ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

interface SwitchProps {
  label: ReactNode;
  hint?: ReactNode;
  checked: boolean;
  onChange: (next: boolean) => void;
}

export function Switch({ label, hint, checked, onChange }: SwitchProps) {
  const hintId = useId();
  return (
    <div className="setting">
      <label className="wk-switch">
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby={hint ? hintId : undefined}
        />
        <span className="wk-switch__track" aria-hidden="true">
          <span className="wk-switch__knob" />
        </span>
        {label}
        <span className="wk-switch__state" aria-hidden="true">
          {checked ? "On" : "Off"}
        </span>
      </label>
      {hint && (
        <p className="wk-field__hint" id={hintId}>
          {hint}
        </p>
      )}
    </div>
  );
}

interface ChoiceGroupProps<T extends string> {
  legend: ReactNode;
  options: { value: T; label: ReactNode; hint?: ReactNode; icon?: IconName }[];
  value: T;
  onChange: (next: T) => void;
}

export function ChoiceGroup<T extends string>({ legend, options, value, onChange }: ChoiceGroupProps<T>) {
  const name = useId();
  return (
    <fieldset className="wk-dpick choice">
      <legend>{legend}</legend>
      <div className="wk-dpick__opts">
        {options.map((o) => (
          <div className="wk-dpick__opt" key={o.value}>
            <input
              type="radio"
              id={`${name}-${o.value}`}
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <label htmlFor={`${name}-${o.value}`}>
              {value !== o.value && o.icon ? (
                <Icon name={o.icon} size={20} className="wk-dpick__check wk-dpick__check--icon" />
              ) : (
                <Icon name="check" size={20} className="wk-dpick__check" />
              )}
              <span>
                {o.label}
                {o.hint && <small className="choice__hint">{o.hint}</small>}
              </span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

interface AnswersProps {
  legend: ReactNode;
  hint?: ReactNode;
  options: { value: string; label: ReactNode }[];
  value: string[];
  multi?: boolean;
  onChange: (next: string[]) => void;
}

export function Answers({ legend, hint, options, value, multi, onChange }: AnswersProps) {
  const name = useId();
  const toggle = (v: string) => onChange(!multi ? [v] : value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <fieldset className="answers" aria-describedby={hint ? `${name}-hint` : undefined}>
      <legend className="answers__legend">{legend}</legend>
      {hint && (
        <p className="answers__hint" id={`${name}-hint`}>
          {hint}
        </p>
      )}
      <ul className="answers__list">
        {options.map((o) => (
          <li key={o.value}>
            <label className="wk-check answers__opt">
              <input type={multi ? "checkbox" : "radio"} name={name} checked={value.includes(o.value)} onChange={() => toggle(o.value)} />
              <span className="wk-check__box" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              <span>{o.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
