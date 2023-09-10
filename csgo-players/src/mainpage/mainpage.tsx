import { useTeams } from "../teams/use-teams";
import Player from "../teams/player"
import "./mainpage.css";

export default function Mainpage() {
  const teams = useTeams();

  if (teams === undefined) return <></>;
  return (
    <div>
      {teams[0].name}
      <img src={teams[0].logo} />
      <Player player={teams[0].players[0]} />
    </div>
  );
}
