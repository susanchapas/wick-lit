import type { ReactNode } from "react";
import { Icon } from "../../components/Icon";

interface ActivityProps {
  id: string;
  n: number;
  title: string;
  done?: boolean;
  children: ReactNode;
}

export function Activity({ id, n, title, done, children }: ActivityProps) {
  return (
    <section className="wk-card guide-act" aria-labelledby={id} data-done={done || undefined}>
      <header className="guide-act__head">
        <span className="guide-act__num" aria-hidden="true">
          {done ? <Icon name="check" size={20} /> : String(n).padStart(2, "0")}
        </span>
        <h3 className="aside" id={id} tabIndex={-1}>
          {title}
        </h3>
        {done && <span className="wk-sr">, done</span>}
      </header>
      {children}
    </section>
  );
}
