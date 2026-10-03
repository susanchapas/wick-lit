import { NavLink } from "react-router";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

const items: { to: string; label: string; icon: IconName }[] = [
  { to: "/", label: "Grove", icon: "grove" },
  { to: "/trails", label: "Trails", icon: "trail" },
  { to: "/lanterns", label: "Lanterns lit", icon: "lantern" },
  { to: "/guide", label: "Field guide", icon: "guide" },
];

export function NavBar() {
  return (
    <nav className="wk-nav shell__nav" aria-label="Main">
      {items.map((i) => (
        <NavLink key={i.to} to={i.to} end={i.to === "/"} className="wk-nav__item">
          <Icon name={i.icon} />
          {i.label}
        </NavLink>
      ))}
    </nav>
  );
}
