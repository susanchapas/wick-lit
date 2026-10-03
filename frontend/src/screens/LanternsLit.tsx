import { ButtonLink } from "../components/Button";
import { EmptyState } from "../components/Feedback";

export function LanternsLit() {
  return (
    <>
      <title>Lanterns lit · Wick</title>
      <h1 className="title">Lanterns lit</h1>
      <EmptyState
        title="No lanterns lit yet."
        aside="Your wick is ready when you are."
        action={
          <ButtonLink tone="lantern" to="/trails">
            Find a trail
          </ButtonLink>
        }
      >
        Finish a trail to light your first lantern.
      </EmptyState>
    </>
  );
}
