import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Notice } from "../components/Feedback";
import { OnboardingStep } from "../components/OnboardingStep";
import { setOnboarded } from "../lib/settings";

export function SteppingIn() {
  const navigate = useNavigate();
  const enter = () => {
    setOnboarded();
    navigate("/", { replace: true });
  };

  return (
    <OnboardingStep
      step={3}
      title="What you're stepping into"
      back="/welcome/access"
      action={
        <Button tone="lantern" onClick={enter} iconAfter="arrow">
          I understand, continue
        </Button>
      }
    >
      <p className="body-lg prose">
        Trails show moments that can be hard to watch: drinking, pressure, harassment and private images shared without
        consent. They show the warning signs and stop before any harm happens.
      </p>
      <ul className="wk-cnote__list prose">
        <li>You see a content note before every trail.</li>
        <li>You can step out at any moment. Nothing is saved unless you finish.</li>
        <li>Your scores and history are private to you.</li>
        <li>If a trail brings up something personal, it is okay to stop and take a break.</li>
      </ul>
      <Notice tone="safety" title="This is practice.">
        If someone is in danger right now, call 911 or campus security.
      </Notice>
    </OnboardingStep>
  );
}
