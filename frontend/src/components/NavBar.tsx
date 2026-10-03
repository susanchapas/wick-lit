import { NavLink } from "react-router";
import { Lockup } from "./Brand";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

const items: { to: string; label: string; icon: IconName }[] = [
  { to: "/", label: "The grove", icon: "grove" },
  { to: "/trails", label: "Trails", icon: "trail" },
  { to: "/lanterns", label: "Lanterns lit", icon: "lantern" },
  { to: "/guide", label: "Field guide", icon: "guide" },
];

export function NavBar() {
  return (
    <nav className="wk-nav shell__nav" aria-label="Main">
      <span className="shell__brand">
        <Lockup />
      </span>
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.to === "/"} className="wk-nav__item">
          <Icon name={i.icon} />
          {i.label}
        </NavLink>
      ))}
      <NavLink to="/settings" className="wk-nav__item shell__settings">
        <Icon name="settings" />
        Settings
      </NavLink>
      <p className="caption muted shell__note">Private practice. Voice audio is deleted after 24 hours.</p>
    </nav>
  );
}
