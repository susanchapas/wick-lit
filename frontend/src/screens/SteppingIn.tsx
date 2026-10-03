import type { MouseEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Notice } from "../components/Feedback";
import { Icon } from "../components/Icon";
import { OnboardingStep } from "../components/OnboardingStep";
import { burst } from "../lib/effects";
import { setOnboarded } from "../lib/settings";

export function SteppingIn() {
  const navigate = useNavigate();
  const enter = (e: MouseEvent<HTMLButtonElement>) => {
    burst(e.currentTarget);
    setOnboarded();
    navigate("/", { replace: true });
  };

  return (
    <OnboardingStep
      step={3}
      title="What you’re stepping into"
      lead="Please read this before your first practice. It is short, direct, and important."
      back="/welcome/access"
      backLabel="Back to step 2"
      note="Continue only when you feel ready."
      action={
        <Button tone="lantern" size="lg" onClick={enter} iconAfter="arrow" className="block">
          I understand, enter the grove
        </Button>
      }
    >
      <section className="wk-card panel" aria-labelledby="awareness">
        <h2 id="awareness" className="overline eyebrow-row">
          <Icon name="caution" size={20} />
          Content awareness.
        </h2>
        <p className="subtitle">
          The people you practice with are AI characters playing a role. They will say pressuring, dismissive, even
          harassing things, on purpose. That is the rehearsal: real pressure, zero real risk.
        </p>
        <hr className="divider" />
        <div className="icon-row">
          <Icon name="step-out" size={20} />
          <div>
            <h3 className="label">You stay in control.</h3>
            <p className="muted">
              You can step out at any moment. Stepping out ends the session without evaluation. Voice audio is transcribed and not stored.
            </p>
          </div>
        </div>
      </section>
      <Notice tone="safety" title="This is practice.">
        If someone is in danger right now, call 911 or campus security.
      </Notice>
    </OnboardingStep>
  );
}
