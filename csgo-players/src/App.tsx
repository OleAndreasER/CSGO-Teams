import "./App.css";
import { useTeams } from "./teams/use-teams";

export function App() {
  const teams = useTeams();

  if (teams === undefined) return <></>;
  return (
    <div>
      {teams[0].name}
      <img src={teams[0].logo} />
    </div>
  );
}
