import type { ReactNode } from "react";
import { Mark } from "./Brand";
import { ButtonLink } from "./Button";

interface SessionBarProps {
  exitTo: string;
  actions?: ReactNode;
  children?: ReactNode;
}

export function SessionBar({ exitTo, actions, children }: SessionBarProps) {
  return (
    <header className="session-bar">
      {children ?? <Mark size={32} />}
      <div className="actions">
        {actions}
        <ButtonLink tone="exit" icon="step-out" to={exitTo}>
          Step out
        </ButtonLink>
      </div>
    </header>
  );
}
