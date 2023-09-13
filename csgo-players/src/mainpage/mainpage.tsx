import { useTeams } from "../teams/use-teams";
import Team from "../teams/team";
import "./mainpage.css";
import { useState } from "react";
import TeamNavigation from "./team-navigation/team-navigation";

export default function Mainpage() {
  const teams = useTeams();
  const [displayedTeamIndex, setDisplayedTeamIndex] = useState<number>(0);

  if (teams === undefined) return <></>;
  return (
    <div>
      <Team team={teams[displayedTeamIndex]} />
      <TeamNavigation
        displayedTeamIndex={displayedTeamIndex}
        setDisplayedTeamIndex={setDisplayedTeamIndex}
        teams={teams.length}
      />
    </div>
  );
}
