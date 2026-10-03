import { Embers, Scenery } from "../components/Brand";
import { ButtonLink } from "../components/Button";
import { Icon } from "../components/Icon";
import type { IconName } from "../components/icons";
import { OnboardHeader } from "../components/OnboardingStep";

const steps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "trail",
    title: "Pick a trail.",
    text: "Each trail is a real situation: a party, a bar, a group chat. You read what it contains before you start.",
  },
  {
    icon: "mic",
    title: "Practice in the clearing.",
    text: "Speak or type to the people in the scene. It takes about a minute. You can step out at any time.",
  },
  {
    icon: "steady",
    title: "Get coached.",
    text: "You get private, transcript-grounded feedback and one clear thing to try next time.",
  },
];

export function Welcome() {
  return (
    <div className="onboard welcome">
      <title>Welcome · Wick</title>
      <OnboardHeader />
      <main className="onboard__body">
        <div className="onboard__intro">
          <h1 className="hero">Practice before the moment asks you to act.</h1>
          <p className="body-lg muted prose">
            People freeze because they have never practiced. Wick offers short voice or text role-play with an AI character,
            followed by calm, transcript-grounded feedback.
          </p>
          <div className="actions">
            <ButtonLink tone="lantern" size="lg" ornate to="/welcome/access">
              Begin with Wick
            </ButtonLink>
          </div>
        </div>
        <figure className="welcome-art">
          <div className="welcome-art__pane">
            <Embers count={8} />
          </div>
          <figcaption className="aside">
            When the grove goes dark,
            <br />
            keep your wick lit.
          </figcaption>
        </figure>
        <section className="section welcome__how" aria-labelledby="how">
          <h2 id="how" className="label eyebrow">
            How practice works.
          </h2>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={step.title} className="step-card" tabIndex={0}>
                <span className="step-card__number" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="step-card__face">
                  <span className="step-card__icon">
                    <Icon name={step.icon} size={24} />
                  </span>
                  <h3 className="step-card__title">{step.title}</h3>
                </div>
                <div className="step-card__text">
                  <p className="muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Scenery height={160} />
    </div>
  );
}
