import type { ReactNode } from "react";
import { Link } from "react-router";
import { Lockup, Scenery } from "./Brand";
import { Icon } from "./Icon";
import { withPeriod } from "../lib/text";

export function OnboardHeader({ back }: { back?: string }) {
  return (
    <header className="onboard-head">
      {back && (
        <Link className="pill pill--link" to={back}>
          <Icon name="arrow" size={20} className="flip" />
          Back
        </Link>
      )}
      <Link to="/welcome" className="onboard-head__brand">
        <Lockup />
      </Link>
    </header>
  );
}

interface OnboardingStepProps {
  title: string;
  lead: ReactNode;
  back: string;
  action: ReactNode;
  note?: ReactNode;
  children: ReactNode;
}

export function OnboardingStep({ title, lead, back, action, note, children }: OnboardingStepProps) {
  return (
    <div className="onboard">
      <title>{`${title} · Wick`}</title>
      <OnboardHeader back={back} />
      <main className="onboard__body">
        <div className="onboard__intro">
          <h1 className="hero">{withPeriod(title)}</h1>
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
