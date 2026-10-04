import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

interface Look {
  tone?: "lantern" | "frost" | "bark" | "quiet" | "exit";
  size?: "md" | "lg";
  icon?: IconName;
  iconAfter?: IconName;
  ornate?: boolean;
  className?: string;
  children: ReactNode;
}

const classes = ({ tone = "frost", size, ornate, className }: Look) =>
  ["wk-btn", `wk-btn--${tone}`, size === "lg" && "wk-btn--lg", ornate && "wk-btn-ornate", className]
    .filter(Boolean)
    .join(" ");

function Content({ icon, iconAfter, ornate, children }: Look) {
  return (
    <>
      {ornate && <span className="wk-btn-orn" aria-hidden="true" />}
      {icon && <Icon name={icon} size={20} className="wk-btn__glyph" />}
      {children}
      {iconAfter && <Icon name={iconAfter} size={20} className="wk-btn__after" />}
      {ornate && <span className="wk-btn-orn r" aria-hidden="true" />}
    </>
  );
}

export function Button({ tone, size, icon, iconAfter, ornate, className, children, ...rest }: Look & ButtonHTMLAttributes<HTMLButtonElement>) {
  const look = { tone, size, icon, iconAfter, ornate, className, children };
  return (
    <button type="button" className={classes(look)} {...rest}>
      <Content {...look} />
    </button>
  );
}

export function ButtonLink({ tone, size, icon, iconAfter, ornate, className, children, ...rest }: Look & Omit<LinkProps, "className" | "children">) {
  const look = { tone, size, icon, iconAfter, ornate, className, children };
  return (
    <Link className={classes(look)} {...rest}>
      <Content {...look} />
    </Link>
  );
}
