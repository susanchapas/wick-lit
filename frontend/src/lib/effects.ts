const root = document.documentElement;

const still = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches || root.dataset.motion === "still";

function particle(className: string, x: number, y: number) {
  const el = document.createElement("i");
  el.className = className;
  el.setAttribute("aria-hidden", "true");
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  return el;
}

/** Releases a small burst of embers and four-point sparks from the centre of an element. Frame moments only, never on a score. */
export function burst(target: Element, count = 14) {
  if (still()) return;
  const r = target.getBoundingClientRect();
  const spread = innerWidth < 600 ? 48 : innerWidth < 960 ? 64 : 76;
  const layer = particle("wk-burst", r.left + r.width / 2, r.top + r.height / 2);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const reach = spread * (0.5 + Math.random() * 0.5);
    const spark = document.createElement("i");
    if (i % 3 === 0) spark.className = "is-star";
    spark.style.setProperty("--dx", `${Math.cos(angle) * reach}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * reach - 16}px`);
    spark.style.animationDelay = `${Math.random() * 80}ms`;
    layer.append(spark);
  }
  document.body.append(layer);
  setTimeout(() => layer.remove(), 1400);
}

/** Spreads a warm ripple from the press point inside any `.wk-btn`. Install once on the document. */
export function ripple(e: PointerEvent) {
  const btn = (e.target as Element).closest?.(".wk-btn:not([disabled]):not([aria-disabled='true'])");
  if (!btn || still()) return;
  const r = btn.getBoundingClientRect();
  const el = document.createElement("i");
  el.className = "wk-ripple";
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = `--x:${e.clientX - r.left}px;--y:${e.clientY - r.top}px;--s:${Math.max(r.width, r.height) * 2}px`;
  btn.append(el);
  setTimeout(() => el.remove(), 700);
}

let last = 0;
let live = 0;

/** Sheds embers from the pointer that float up and fade. Use on hero and onboarding areas only. */
export function emberTrail(e: Pick<PointerEvent, "pointerType" | "clientX" | "clientY" | "timeStamp">) {
  if (e.pointerType !== "mouse" || live >= 24 || e.timeStamp - last < 36 || still()) return;
  last = e.timeStamp;
  live++;
  const el = particle("wk-trail", e.clientX, e.clientY);
  el.style.setProperty("--dx", `${(Math.random() - 0.5) * 24}px`);
  document.body.append(el);
  setTimeout(() => {
    el.remove();
    live--;
  }, 1100);
}
