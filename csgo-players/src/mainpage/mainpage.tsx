import { useTeams } from "../teams/use-teams";
import Team from "../teams/team";
import "./mainpage.css";

export default function Mainpage() {
  const teams = useTeams();

  if (teams === undefined) return <></>;
  return (
    <div>
      <Team team={teams[0]}/>
    </div>
  );
}
