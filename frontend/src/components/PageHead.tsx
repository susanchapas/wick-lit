import type { ReactNode } from "react";

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
        <h1 className="title">{title}</h1>
        <p className="body-lg muted prose">{lead}</p>
      </div>
      {aside}
    </header>
  );
}
