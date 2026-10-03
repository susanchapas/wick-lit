import { Mark, Scenery, WickRule } from "../components/Brand";
import { ButtonLink } from "../components/Button";
import { TrailList } from "../components/TrailList";

export function Grove() {
  return (
    <>
      <title>The grove · Wick</title>
      <header className="grove-head">
        <div className="grove-head__text">
          <Mark size={40} />
          <p className="overline muted">The grove</p>
          <h1 className="hero">Keep your wick lit</h1>
        </div>
        <Scenery />
      </header>
      <section className="section" aria-labelledby="tonight">
        <WickRule />
        <h2 id="tonight" className="heading">
          Trails for tonight
        </h2>
        <TrailList limit={3} featureFirst />
        <ButtonLink tone="quiet" to="/trails" className="self-start">
          See all trails
        </ButtonLink>
      </section>
    </>
  );
}
