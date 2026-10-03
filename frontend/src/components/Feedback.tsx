import type { ReactNode } from "react";
import { Icon } from "./Icon";

interface NoticeProps {
  tone?: "safety" | "caution" | "danger" | "steady" | "info";
  title: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}

const noticeIcon = { safety: "caution", caution: "caution", danger: "danger", steady: "steady", info: "info" } as const;

export function Notice({ tone = "info", title, action, children }: NoticeProps) {
  return (
    <div className={`wk-notice wk-notice--${tone}`} role={tone === "danger" || tone === "steady" ? "status" : undefined}>
      <span className="wk-notice__icon">
        <Icon name={noticeIcon[tone]} size={20} />
      </span>
      <p className="wk-notice__title">{title}</p>
      {children && <p className="wk-notice__body">{children}</p>}
      {action && <div className="wk-notice__action">{action}</div>}
    </div>
  );
}

interface EmptyStateProps {
  title: ReactNode;
  aside?: ReactNode;
  action: ReactNode;
  children?: ReactNode;
}

export function EmptyState({ title, aside, action, children }: EmptyStateProps) {
  return (
    <div className="wk-empty">
      <div className="wk-empty__art" aria-hidden="true">
        <svg viewBox="0 0 160 220" width="96" height="132" fill="none" stroke="currentColor">
          <path strokeWidth="1.25" d="M80 4C112 20 156 50 156 92V212A4 4 0 0 1 152 216H8A4 4 0 0 1 4 212V92C4 50 48 20 80 4Z" />
          <path strokeWidth="1" d="M80 16C106 30 144 56 144 94V204H16V94C16 56 54 30 80 16Z" />
        </svg>
        <svg className="wk-flame" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C14.6 6.4 18 8.9 18 13.6A6 6 0 0 1 6 13.6C6 10.6 7.8 8.6 9.2 6.4C9.8 8.2 10.7 9.2 11.8 9.6C12.6 7.6 12.6 5.3 12 3Z" />
        </svg>
      </div>
      <h2 className="wk-empty__title">{title}</h2>
      {aside && <p className="wk-empty__aside">{aside}</p>}
      {children && <p className="wk-empty__body">{children}</p>}
      {action}
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="wk-skeleton" aria-hidden="true">
      <div className="wk-skeleton__bar wk-skeleton__bar--title" />
      <div className="wk-skeleton__bar" />
      <div className="wk-skeleton__bar" />
      <div className="wk-skeleton__bar wk-skeleton__bar--short" />
    </div>
  );
}
