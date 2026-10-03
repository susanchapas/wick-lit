import type { ReactNode } from "react";
import { ButtonLink } from "./Button";

interface OnboardingStepProps {
  step: number;
  title: string;
  back: string;
  action: ReactNode;
  children: ReactNode;
}

export function OnboardingStep({ step, title, back, action, children }: OnboardingStepProps) {
  return (
    <main className="onboard">
      <title>{`${title} · Wick`}</title>
      <p className="overline muted">Step {step} of 3</p>
      <h1 className="title">{title}</h1>
      {children}
      <div className="actions">
        {action}
        <ButtonLink tone="quiet" to={back}>
          Back
        </ButtonLink>
      </div>
    </main>
  );
}
