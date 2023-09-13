import { useTeams } from "../teams/use-teams";
import Team from "../teams/team";
import "./mainpage.css";
import { TeamData } from "../teams/teams";
import { useEffect, useState } from "react";

export default function Mainpage() {
  const teamsFromAPI = useTeams();

  const [sort, setSort] = useState<string>("");
  const [teams, setTeams] = useState<TeamData[]>([])
  
  useEffect(() => {
    if (teamsFromAPI !== undefined) {
      const teamsCopy = teams ? [...teamsFromAPI] : []
      switch(sort) {
        case "rank-ascending":
          teamsCopy.sort((a, b) => a.ranking - b.ranking);
          break;
        case "rank-descending":
          teamsCopy.sort((a, b) => b.ranking - a.ranking);
          break;
        case "name-a-z":
          teamsCopy.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-z-a":
          teamsCopy.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
      setTeams(teamsCopy)
    }
  }, [sort, teamsFromAPI, teams])
  

  return (
    <div>
      <div className="filter-and-sort">
        <div className="sort">
          <label htmlFor="sort">Sort options: </label>
          <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
            <option value="rank-ascending">By rank (ascending)</option>
            <option value="rank-descending">By rank (descending)</option>
            <option value="name-a-z">By team name (a-z)</option>
            <option value="name-z-a">By team name (z-a)</option>
          </select>
        </div>
      </div>
      <div className="teams">
        {teams.map((team) => (
          <Team key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
