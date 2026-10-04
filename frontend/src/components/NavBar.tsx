import { NavLink } from "react-router";
import { Lockup } from "./Brand";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

const items: { to: string; label: string; icon: IconName }[] = [
  { to: "/", label: "The Grove", icon: "grove" },
  { to: "/trails", label: "Trails", icon: "trail" },
  { to: "/journey", label: "Journey", icon: "lantern" },
  { to: "/guide", label: "Field Guide", icon: "guide" },
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
    </nav>
  );
}
