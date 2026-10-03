import { ButtonLink } from "../components/Button";
import { ChoiceGroup, Switch } from "../components/Controls";
import { OnboardingStep } from "../components/OnboardingStep";
import { updateSettings, useSettings } from "../lib/settings";

export function Access() {
  const s = useSettings();
  return (
    <OnboardingStep
      step={2}
      title="Access and modality"
      lead="Set up Wick the way that works for you. You can change these at any time in Settings."
      back="/welcome"
      backLabel="Back to welcome"
      action={
        <ButtonLink tone="lantern" size="lg" to="/welcome/stepping-in" iconAfter="arrow">
          Continue
        </ButtonLink>
      }
    >
      <div className="wk-card panel">
        <ChoiceGroup
          legend="Theme"
          value={s.theme}
          onChange={(theme) => updateSettings({ theme })}
            options={[
              { value: "night", label: "Night grove" },
              { value: "dawn", label: "Dawn" },
            ]}
        />
        <ChoiceGroup
          legend="Reply by"
          value={s.input}
          onChange={(input) => updateSettings({ input })}
          options={[
            { value: "voice", label: "Voice" },
            { value: "text", label: "Text" },
          ]}
        />
        <Switch
          label="Captions"
          hint="Show every spoken line as text."
          checked={s.captions}
          onChange={(captions) => updateSettings({ captions })}
        />
        <Switch
          label="Reduce motion"
          hint="Turn off glows, pulses and screen transitions."
          checked={s.reduceMotion}
          onChange={(reduceMotion) => updateSettings({ reduceMotion })}
        />
        <Switch
          label="Untimed role-play"
          hint="Remove the timer. Take as long as you need."
          checked={s.untimed}
          onChange={(untimed) => updateSettings({ untimed })}
        />
      </div>
    </OnboardingStep>
  );
}
