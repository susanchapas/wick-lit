import { WickRule } from "../components/Brand";
import { TrailList } from "../components/TrailList";

export function Trails() {
  return (
    <>
      <title>Trails · Wick</title>
      <header className="section">
        <h1 className="title">Trails</h1>
        <WickRule />
        <p className="muted prose">Choose a trail to practise. Each one takes about a minute.</p>
      </header>
      <TrailList />
    </>
  );
}
