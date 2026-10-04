import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { Button, ButtonLink } from "../components/Button";
import { Notice, WickLoader } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/PageHead";
import { generateScenario } from "../lib/api";
import { saveCustomScenario } from "../lib/customScenarios";
import type { GeneratedScenario } from "../lib/types";

const examples = [
  "A team lead keeps interrupting a junior employee in a project meeting while others stay quiet.",
  "A coworker pressures someone to share private medical information in a group Slack channel.",
  "A manager dismisses repeated concerns about an unrealistic deadline and blames one teammate publicly.",
];

export function CreateScenario() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState<GeneratedScenario | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const idea = prompt.trim();
    if (idea.length < 20 || working) return;
    setWorking(true);
    setError("");
    setGenerated(null);
    try {
      const result = await generateScenario(idea);
      saveCustomScenario(result);
      setGenerated(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Wick could not generate that scenario yet.");
    } finally {
      setWorking(false);
    }
  };

  return (
    <>
      <title>Create a scenario · Wick</title>
      <PageHead
        overline="Scenario studio · Prototype"
        title="Turn a real situation into practice"
        lead="Describe a workplace or campus moment. Wick will shape the setting, assign characters and voices, and build a short scenario you can practice immediately."
      />

      <section className={`scenario-studio${generated ? " is-previewing" : ""}`} aria-labelledby="scenario-idea-title">
        <form className="wk-card panel scenario-studio__form wk-ornate" onSubmit={submit}>
          <div className="section">
            <p className="eyebrow overline">Your idea</p>
            <h2 id="scenario-idea-title" className="heading">What should someone practice?</h2>
            <p className="muted prose">
              Include the setting, who is involved, and the difficult moment. Names and roles are optional—Wick can create them.
            </p>
          </div>
          <label className="wk-field scenario-studio__field">
            <span className="wk-field__label">Scenario prompt</span>
            <textarea
              className="wk-field__control scenario-studio__prompt"
              value={prompt}
              minLength={20}
              maxLength={1500}
              rows={7}
              disabled={working}
              aria-invalid={Boolean(error)}
              placeholder="Example: During a planning meeting, a senior employee repeatedly takes credit for a new hire's work..."
              onChange={(event) => setPrompt(event.target.value)}
            />
            <span className="wk-field__foot">
              <span className="wk-field__hint">Do not include confidential company or personal information.</span>
              <span className="wk-field__count">{prompt.length}/1500</span>
            </span>
          </label>
          <div className="scenario-studio__examples" aria-label="Example scenario ideas">
            <p className="caption muted">Try an example</p>
            <div className="chips">
              {examples.map((example, index) => (
                <button className="pill pill--toggle" type="button" key={example} disabled={working} onClick={() => setPrompt(example)}>
                  Example {index + 1}
                </button>
              ))}
            </div>
          </div>
          {error && <Notice tone="danger" title="That scenario did not generate.">{error}</Notice>}
          {working ? (
            <WickLoader label="Shaping the setting, characters, and choices…" />
          ) : (
            <div className="actions">
              <Button tone="lantern" size="lg" icon="flame" type="submit" disabled={prompt.trim().length < 20}>
                Generate scenario
              </Button>
              <ButtonLink tone="quiet" to="/trails">Cancel</ButtonLink>
            </div>
          )}
        </form>

        {generated && (
          <article className="wk-card panel scenario-studio__preview" aria-live="polite">
            <div className="section">
              <p className="eyebrow overline">Generated trail</p>
              <h2 className="heading">{generated.scenario.title}</h2>
              <p className="muted prose">{generated.scenario.setup}</p>
            </div>
            <dl className="scenario-studio__details">
              <div><dt>Setting</dt><dd>{generated.scenario.location}</dd></div>
              <div><dt>Characters</dt><dd>{generated.scenario.characters.filter((name) => name !== "You").join(", ")}</dd></div>
              <div><dt>Practice time</dt><dd>About {generated.scenario.minutes} min</dd></div>
            </dl>
            <Notice tone="info" title="Prototype scenario">
              Wick generated this trail from your description. Review the content note before practicing.
            </Notice>
            <div className="actions">
              <Button tone="lantern" size="lg" iconAfter="arrow" onClick={() => navigate(`/trails/${generated.scenario.id}`)}>
                Review and practice
              </Button>
              <Button tone="frost" onClick={() => setGenerated(null)}>Generate another</Button>
            </div>
          </article>
        )}
      </section>

      <p className="caption muted prose icon-row">
        <Icon name="info" size={20} />
        <span>Generated scenarios stay in this browser tab for the prototype. Provider keys remain on the Wick backend.</span>
      </p>
    </>
  );
}
