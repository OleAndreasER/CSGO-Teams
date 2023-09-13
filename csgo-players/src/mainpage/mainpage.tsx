import { useTeams } from "../teams/use-teams";
import Team from "../teams/team";
import "./mainpage.css";
import { PlayerData, TeamData } from "../teams/teams";
import { useEffect, useState } from "react";

export default function Mainpage() {
  const teamsFromAPI = useTeams();

  const [sort, setSort] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    if (teamsFromAPI !== undefined) {
      const teamsWithPlayersFromCountry: Map<string, TeamData[]> = new Map();
    
      // Iterate over all teams
      for (let i = 0; i < teamsFromAPI.length; i++) {
        const players: PlayerData[] = teamsFromAPI[i].players;
        // Iterate over all players in the team
        for (let j = 0; j < players.length; j++) {
          const country = players[j].country.name;
          // If the country is already in the map, add the team to the array of teams from that country if it isn't already there
          if (teamsWithPlayersFromCountry.has(country)) {
            if (
              !teamsWithPlayersFromCountry
                .get(country)
                ?.includes(teamsFromAPI[i])
            ) {
              teamsWithPlayersFromCountry.get(country)?.push(teamsFromAPI[i]);
            }
          } else {
            // If the country isn't in the map, add it with the an array containing the team as the value
            teamsWithPlayersFromCountry.set(country, [teamsFromAPI[i]]);
          }
        }
      }

      // Set the countries state to the keys of the map (the countries) sorted alphabetically
      setCountries(Array.from(teamsWithPlayersFromCountry.keys()).sort());
    }
  }, [teamsFromAPI]);

  useEffect(() => {
    if (teamsFromAPI !== undefined) {
      // Makes a copy of the teams array from the useTeams hook, so we don't mutate the original array
      let teamsCopy = [...teamsFromAPI];

      if (country !== "") {
        // Filter out all teams that don't have any players from the selected country
        teamsCopy = teamsCopy.filter((team) => {
          for (let i = 0; i < team.players.length; i++) {
            if (team.players[i].country.name === country) {
              console.log(country);
              return true;
            }
          }
          return false;
        });
      }

      // Sort the teams according to the selected sort option
      switch (sort) {
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

      setTeams(teamsCopy);
    }
  }, [sort, country, teamsFromAPI]);

  return (
    <div>
      <div className="filter-and-sort">
        <div className="sort">
          <label htmlFor="sort">Sort options: </label>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="rank-ascending">By rank (ascending)</option>
            <option value="rank-descending">By rank (descending)</option>
            <option value="name-a-z">By team name (a-z)</option>
            <option value="name-z-a">By team name (z-a)</option>
          </select>
        </div>
        <div className="country-select">
          <label htmlFor="sort">Show teams with players from country: </label>
          <select
            name="country"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
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
