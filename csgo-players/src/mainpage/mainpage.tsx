import { useTeams } from "../teams/use-teams";
import "./mainpage.css";

export default function Mainpage() {
  const teams = useTeams();

  if (teams === undefined) return <></>;
  return (
    <div>
      {teams[0].name}
      <img src={teams[0].logo} />
          </div>
  );
}
