import type { ReactNode } from "react";
import { Link } from "react-router";
import { Lockup, Scenery } from "./Brand";
import { Icon } from "./Icon";

export function OnboardHeader({ back, backLabel }: { back?: string; backLabel?: string }) {
  return (
    <header className="onboard-head">
      {back && (
        <Link className="pill pill--link" to={back}>
          <Icon name="arrow" size={20} className="flip" />
          {backLabel}
        </Link>
      )}
      <Link to="/welcome" className="onboard-head__brand">
        <Lockup />
      </Link>
    </header>
  );
}

interface OnboardingStepProps {
  step: number;
  title: string;
  lead: ReactNode;
  back: string;
  backLabel: string;
  action: ReactNode;
  note?: ReactNode;
  children: ReactNode;
}

export function OnboardingStep({ step, title, lead, back, backLabel, action, note, children }: OnboardingStepProps) {
  return (
    <div className="onboard">
      <title>{`${title} · Wick`}</title>
      <OnboardHeader back={back} backLabel={backLabel} />
      <main className="onboard__body">
        <div className="onboard__intro">
          <p className="pill pill--lantern overline">Before you enter · {step} of 3</p>
          <h1 className="hero">{title}</h1>
          <p className="body-lg muted prose">{lead}</p>
        </div>
        <div className="onboard__panel">
          {children}
          {action}
          {note && <p className="caption muted center">{note}</p>}
        </div>
      </main>
      <Scenery height={160} />
    </div>
  );
}
