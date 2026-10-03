import { useParams } from "react-router";
import { ButtonLink } from "../components/Button";

export function Clearing() {
  const { id } = useParams();
  return (
    <main className="cnote-screen">
      <title>Role-play · Wick</title>
      <ButtonLink tone="exit" icon="step-out" to={`/trails/${id}`} className="step-out">
        Step out
      </ButtonLink>
      <div className="wk-cnote">
        <h1 className="wk-cnote__title">Role-play</h1>
        <p className="wk-cnote__lead">The role-play stage is not built yet. It arrives in the next phase.</p>
      </div>
    </main>
  );
}
