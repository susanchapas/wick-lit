import { wordmark } from "./wordmark";

interface MarkProps {
  size?: number;
  live?: boolean;
  label?: string;
}

export function Mark({ size = 48, live, label }: MarkProps) {
  return (
    <svg
      className={live ? "wk-mark wk-mark--live" : "wk-mark"}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path className="wk-mark__pane" d="M32 4C42.5 9.5 52 18.5 52 31V58A2 2 0 0 1 50 60H14A2 2 0 0 1 12 58V31C12 18.5 21.5 9.5 32 4Z" />
      <path className="wk-mark__flame" d="M32 16C36.6 22.6 42 27.4 42 35.6C42 42.4 37.6 47 32 47C26.4 47 22 42.4 22 35.6C22 29.4 26.4 25.4 28.4 21.4C29.4 24.6 30.6 26.2 32.2 27C33 23.6 32.9 19.6 32 16Z" />
      <path className="wk-mark__core" d="M32 30C34.2 33 36 35 36 38.2C36 41 34.2 43 32 43C29.8 43 28 41 28 38.2C28 35.4 30.2 33.4 32 30Z" />
      <path className="wk-mark__wick" fill="none" strokeWidth="2.5" strokeLinecap="round" d="M32 43V52" />
    </svg>
  );
}

export function Wordmark({ height = 28 }: { height?: number }) {
  return (
    <svg viewBox={wordmark.viewBox} height={height} width={Math.round((height * wordmark.width) / wordmark.height)} role="img" aria-label="Wick">
      <path className="wk-wordmark__ink" d={wordmark.ink} />
      <path className="wk-wordmark__flame" d={wordmark.flame} />
      <path className="wk-wordmark__core" d={wordmark.core} />
    </svg>
  );
}

export function Lockup({ size = 40 }: { size?: number }) {
  return (
    <span className="wk-mark">
      <Mark size={size} />
      <Wordmark height={Math.round((size * 56) / 64)} />
    </span>
  );
}

export function WickRule() {
  return (
    <div className="wk-rule" aria-hidden="true">
      <svg viewBox="155 2 10 16">
        <path fill="currentColor" d="M160 3C162.6 6.6 165 9 165 12.6C165 15.4 162.8 17.4 160 17.4C157.2 17.4 155 15.4 155 12.6C155 9.6 157.6 7.2 160 3Z" />
      </svg>
    </div>
  );
}

function treeline(seed: number, count: number, base: number, min: number, max: number) {
  let s = seed;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const w = 1200 / count;
  let d = `M0 200V${base}`;
  for (let i = 0; i <= count; i++) {
    const x = Math.round(i * w + (rand() - 0.5) * w * 0.4);
    const h = Math.round(min + rand() * (max - min));
    d += `L${x - w * 0.7} ${base}L${x} ${base - h}L${x + w * 0.7} ${base}`;
  }
  return `${d}L1200 ${base}V200Z`;
}

const far = treeline(7, 30, 160, 40, 100);
const near = treeline(31, 20, 188, 50, 130);

const emberSpots = [
  [8, 62, 0],
  [22, 38, 3.1],
  [37, 74, 6.4],
  [51, 46, 1.7],
  [64, 68, 4.6],
  [77, 34, 2.4],
  [88, 58, 7.2],
  [95, 80, 5.3],
];

export function Embers({ count = 7 }: { count?: number }) {
  return (
    <div className="wk-embers" aria-hidden="true">
      {emberSpots.slice(0, Math.min(count, 8)).map(([x, y, delay]) => (
        <i key={x} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `-${delay}s, -${delay / 2}s` }} />
      ))}
    </div>
  );
}

export function Scenery({ height = 200, embers = true }: { height?: number; embers?: boolean }) {
  return (
    <div className="wk-scenery" style={{ height }} aria-hidden="true">
      <div className="wk-scenery__pool" />
      <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice">
        <path className="wk-scenery__far" d={far} />
        <path className="wk-scenery__near" d={near} />
      </svg>
      {embers && <Embers />}
    </div>
  );
}
