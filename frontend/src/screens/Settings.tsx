import { useState } from "react";
import { Button } from "../components/Button";
import { ChoiceGroup, Switch } from "../components/Controls";
import { Dialog, Notice } from "../components/Feedback";
import { PageHead } from "../components/PageHead";
import { clearHistory, useHistory } from "../lib/history";
import { updateSettings, useSettings } from "../lib/settings";

export function Settings() {
  const s = useSettings();
  const history = useHistory();
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  return (
    <>
      <title>Settings · Wick</title>
      <PageHead overline="Settings" title="Accessibility and privacy" lead="Make practice comfortable, readable, and under your control." />
      <div className="settings-grid">
        <section className="wk-card panel">
          <ChoiceGroup
            legend="Theme"
            value={s.theme}
            onChange={(theme) => updateSettings({ theme })}
            options={[
              { value: "night", label: "Night grove" },
              { value: "dawn", label: "Dawn" },
            ]}
          />
          <p className="caption muted">Color is never the only cue. Number and name always accompany strategy colors.</p>
        </section>
        <section className="wk-card panel">
          <ChoiceGroup
            legend="Intensity"
            value={s.intensity}
            onChange={(intensity) => updateSettings({ intensity })}
            options={[
              { value: "gentle", label: "Gentle", hint: "People back down sooner and coaching leans encouraging." },
              { value: "realistic", label: "Realistic", hint: "People push back the way they often do." },
              { value: "intense", label: "Intense", hint: "People argue, deflect, and escalate, with more direct coaching." },
            ]}
          />
        </section>
        <section className="wk-card panel">
          <ChoiceGroup
            legend="Default input"
            value={s.input}
            onChange={(input) => updateSettings({ input })}
            options={[
              { value: "voice", label: "Voice", hint: "Speak your replies. You can always type instead." },
              { value: "text", label: "Text", hint: "Start sessions with typed replies." },
            ]}
          />
        </section>
        <section className="wk-card panel" aria-labelledby="comfort">
          <h2 id="comfort" className="label">
            Comfort.
          </h2>
          <Switch label="Captions" hint="Show every spoken line as text." checked={s.captions} onChange={(captions) => updateSettings({ captions })} />
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
        </section>
      </div>
      <section className="wk-card panel data-panel" aria-labelledby="data">
        <div className="section">
          <h2 id="data" className="subtitle">
            Your practice data.
          </h2>
          <p className="muted">
            Results stay private. Voice audio is transcribed and not stored. You can clear your local practice history and
            reflections at any time.
          </p>
        </div>
        <Button onClick={() => setConfirming(true)} disabled={!history.length}>
          Clear practice history
        </Button>
        {!history.length && !cleared && <p className="caption muted">There is no practice history to clear yet.</p>}
      </section>
      {cleared && <Notice tone="steady" title="Practice history cleared." />}
      <p className="caption muted">Changes save as you make them.</p>
      {confirming && (
        <Dialog
          title="Clear practice history?"
          onClose={() => setConfirming(false)}
          actions={
            <>
              <Button tone="quiet" autoFocus onClick={() => setConfirming(false)}>
                Keep history
              </Button>
              <Button
                onClick={() => {
                  clearHistory();
                  setConfirming(false);
                  setCleared(true);
                }}
              >
                Clear history
              </Button>
            </>
          }
        >
          This removes every lantern and reflection saved in this browser. You cannot undo this.
        </Dialog>
      )}
    </>
  );
}
