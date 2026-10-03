import { WickRule } from "../components/Brand";
import { Strategy } from "../components/Strategy";
import { strategies } from "../lib/strategies";

export function FieldGuide() {
  return (
    <>
      <title>Field guide · Wick</title>
      <header className="section">
        <h1 className="title">Field guide</h1>
        <WickRule />
        <p className="muted prose">Five ways to step in, taught on campuses. Choose the one that keeps everyone safe.</p>
      </header>
      <ul className="trail-grid">
        {strategies.map((d) => (
          <li key={d.id} className="wk-card">
            <Strategy n={d.n} />
            <h2 className="subtitle">{d.meaning}</h2>
            <p className="muted">{d.line}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
