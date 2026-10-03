import { Mark, Scenery } from "../components/Brand";
import { ButtonLink } from "../components/Button";

export function Welcome() {
  return (
    <main className="welcome">
      <title>Welcome · Wick</title>
      <div className="onboard welcome__body">
        <Mark size={72} live label="Wick" />
        <h1 className="hero">Keep your wick lit</h1>
        <p className="body-lg muted prose">
          People freeze in hard moments because they have never practised. Wick lets you practise stepping in: pick a
          real situation, role-play it with AI characters, then get calm, private coaching.
        </p>
        <ButtonLink tone="lantern" size="lg" ornate to="/welcome/how" iconAfter="arrow">
          Get started
        </ButtonLink>
      </div>
      <Scenery height={220} />
    </main>
  );
}
