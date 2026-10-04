import type { ReactNode } from "react";
import { withPeriod } from "../lib/text";

interface PageHeadProps {
  overline: string;
  title: string;
  lead: ReactNode;
  aside?: ReactNode;
}

export function PageHead({ overline, title, lead, aside }: PageHeadProps) {
  return (
    <header className="page-head">
      <div className="section">
        <p className="overline eyebrow">{overline}</p>
        <h1 className="title">{withPeriod(title)}</h1>
        <p className="body-lg muted prose">{lead}</p>
      </div>
      <div className="page-head__aside">
        {aside}
        <img className="avatar" src="/assets/princess-pfp1.webp" alt="Profile" />
      </div>
    </header>
  );
}
