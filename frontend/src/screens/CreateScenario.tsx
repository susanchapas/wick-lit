import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { Button, ButtonLink } from "../components/Button";
import { Notice, WickLoader } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { PageHead } from "../components/PageHead";
import { generateScenario, suggestScenario } from "../lib/api";
import { saveCustomScenario } from "../lib/customScenarios";
import type { GeneratedScenario } from "../lib/types";

export function CreateScenario() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState<GeneratedScenario | null>(null);
  const [working, setWorking] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
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
      setGenerated(result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Wick could not generate that scenario yet.");
    } finally {
      setWorking(false);
    }
  };

  const practiceScenario = () => {
    if (!generated) return;
    saveCustomScenario(generated);
    navigate(`/trails/${generated.scenario.id}`);
  };

  const saveScenario = () => {
    if (!generated) return;
    saveCustomScenario(generated);
    navigate("/trails");
  };

  const suggestIdea = async () => {
    if (suggesting) return;
    setSuggesting(true);
    setError("");
    try {
      setPrompt(await suggestScenario());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Wick could not suggest an idea right now.");
    } finally {
      setSuggesting(false);
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

      <section className="scenario-studio" aria-live="polite">
        {generated ? (
          <article className="wk-card panel scenario-studio__card scenario-studio__preview wk-ornate">
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
            <div className="actions scenario-studio__actions">
              <Button tone="lantern" size="lg" iconAfter="arrow" onClick={practiceScenario}>
                Review and practice
              </Button>
              <Button tone="frost" size="lg" onClick={saveScenario}>Save</Button>
            </div>
          </article>
        ) : working ? (
          <article className="wk-card panel scenario-studio__card scenario-studio__loading wk-ornate">
            <div className="section">
              <p className="eyebrow overline">Building your trail</p>
              <h2 className="heading">Shaping the setting and characters…</h2>
              <p className="muted prose">Wick is turning your idea into a short scenario with distinct roles, choices, and a clear ending.</p>
            </div>
            <WickLoader label="Shaping the setting, characters, and choices…" />
            <p className="caption muted scenario-studio__source">“{prompt}”</p>
          </article>
        ) : (
          <form className="wk-card panel scenario-studio__card scenario-studio__form wk-ornate" onSubmit={submit}>
            <div className="section">
              <p className="eyebrow overline">Your idea</p>
              <h2 id="scenario-idea-title" className="heading">What should someone practice?</h2>
              <p className="muted prose">
                Include the setting, who is involved, and the difficult moment. Names and roles are optional—Wick can create them.
              </p>
            </div>
            <label className="wk-field scenario-studio__field">
              <span className="wk-field__label">Scenario prompt</span>
              <span className="scenario-studio__prompt-wrap">
                <textarea
                  className="wk-field__control scenario-studio__prompt"
                  value={prompt}
                  minLength={20}
                  maxLength={1500}
                  rows={7}
                  aria-invalid={Boolean(error)}
                  aria-busy={suggesting}
                  placeholder="Describe a difficult workplace or campus moment—or use the refresh button for an idea."
                  onChange={(event) => setPrompt(event.target.value)}
                />
                <button
                  className={`scenario-studio__suggest${suggesting ? " is-loading" : ""}`}
                  type="button"
                  aria-label={suggesting ? "Suggesting a scenario idea" : "Suggest a new scenario idea"}
                  title="Suggest a new scenario idea"
                  disabled={suggesting}
                  onClick={suggestIdea}
                >
                  <Icon name="replay" size={20} />
                </button>
              </span>
              <span className="wk-field__foot">
                <span className="wk-field__hint">Do not include confidential company or personal information.</span>
                <span className="wk-field__count">{prompt.length}/1500</span>
              </span>
            </label>
            {error && <Notice tone="danger" title="Wick needs another try.">{error}</Notice>}
            <div className="actions">
              <Button tone="lantern" size="lg" icon="flame" type="submit" disabled={prompt.trim().length < 20}>
                Generate scenario
              </Button>
              <ButtonLink tone="quiet" to="/trails">Cancel</ButtonLink>
            </div>
          </form>
        )}
      </section>

      <p className="caption muted prose icon-row">
        <Icon name="info" size={20} />
        <span>Generated scenarios stay in this browser tab for the prototype. Provider keys remain on the Wick backend.</span>
      </p>
    </>
  );
}
