import { useId, type ReactNode } from "react";
import { Icon } from "./Icon";

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
  options: { value: T; label: ReactNode }[];
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
              <Icon name="check" size={20} className="wk-dpick__check" />
              {o.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
