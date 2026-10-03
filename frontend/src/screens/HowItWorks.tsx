import { ButtonLink } from "../components/Button";
import { Icon } from "../components/Icon";
import type { IconName } from "../components/icons";
import { OnboardingStep } from "../components/OnboardingStep";

const steps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "trail",
    title: "Pick a trail",
    text: "Each trail is a real situation: a party, a bar, a group chat. You read what it contains before you start.",
  },
  {
    icon: "mic",
    title: "Practice in the clearing",
    text: "Speak or type to the people in the scene. It takes about a minute. You can step out at any time.",
  },
  {
    icon: "steady",
    title: "Get coached",
    text: "You get a private score out of 100 on five parts, and one clear thing to try next time.",
  },
];

export function HowItWorks() {
  return (
    <OnboardingStep
      step={1}
      title="How practice works"
      back="/welcome"
      action={
        <ButtonLink tone="lantern" to="/welcome/access" iconAfter="arrow">
          Continue
        </ButtonLink>
      }
    >
      <ol className="stack-list">
        {steps.map((s, i) => (
          <li key={s.title} className="wk-card how-card">
            <span className="how-card__icon">
              <Icon name={s.icon} />
            </span>
            <div>
              <h2 className="subtitle">
                <span className="wk-sr">Step {i + 1}: </span>
                {s.title}
              </h2>
              <p className="muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </OnboardingStep>
  );
}
