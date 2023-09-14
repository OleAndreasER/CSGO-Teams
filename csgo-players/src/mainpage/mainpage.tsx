import { useTeams } from "../teams/use-teams";
import Team from "../teams/team";
import "./mainpage.css";
import { PlayerData, TeamData } from "../teams/teams";
import { useEffect, useState } from "react";

export default function Mainpage() {
  const teamsFromAPI = useTeams();

  const [sortOption, setSortOption] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showInternational, setShowInternational] = useState<boolean>(true);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [countryTeamLUT, setCountryTeamLUT] = useState<Map<string, TeamData[]>>(
    new Map()
  );

  function allEqualCountries(arr: string[]) {
    return arr.every((v) => v === arr[0]);
  }

  function handleChangeSort(newSortOption: string) {
    // Set the sort option state to the new sort option and update the session storage
    setSortOption(newSortOption);
    sessionStorage.setItem("sortOption", newSortOption);
  }

  function handleChangeCountry(newSelectedCountry: string) {
    // Set the selected country state to the new selected country and update the session storage
    setSelectedCountry(newSelectedCountry);
    sessionStorage.setItem("selectedCountry", newSelectedCountry);
  }

  function handleChangeInternational(newShowInternational: boolean) {
    // Set the show international state to the new value for show international and update the session storage
    setShowInternational(newShowInternational);
    sessionStorage.setItem(
      "showInternational",
      newShowInternational.toString()
    );
  }

  useEffect(() => {
    // Load the sort option, selected country and show international from session storage
    // and set the state to the values from session storage if they exist
    const sortOptionFromSessionStorage = sessionStorage.getItem("sortOption");
    if (sortOptionFromSessionStorage !== null) {
      setSortOption(sortOptionFromSessionStorage);
    }
    const selectedCountryFromSessionStorage =
      sessionStorage.getItem("selectedCountry");
    if (selectedCountryFromSessionStorage !== null) {
      setSelectedCountry(selectedCountryFromSessionStorage);
    }
    const showInternationalFromSessionStorage =
      sessionStorage.getItem("showInternational");
    if (showInternationalFromSessionStorage !== null) {
      setShowInternational(JSON.parse(showInternationalFromSessionStorage));
    }
  }, []);

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
            // If the country isn't in the map, add it with an array containing the team as the value
            teamsWithPlayersFromCountry.set(country, [teamsFromAPI[i]]);
          }
        }
      }
      // Set the teamsWithPlayersFromCountry state to the map
      setCountryTeamLUT(teamsWithPlayersFromCountry);

      // Set the countries state to the keys of the map (the countries) sorted alphabetically
      setCountries(Array.from(teamsWithPlayersFromCountry.keys()).sort());
    }
  }, [teamsFromAPI]);

  useEffect(() => {
    if (teamsFromAPI !== undefined) {
      let teamsCopy: TeamData[] = [];
      if (selectedCountry !== "") {
        // If a country is selected, set teamsCopy to (a copy of) the array of teams from that country
        teamsCopy = [...(countryTeamLUT.get(selectedCountry) ?? [])];
      } else {
        // If no country is selected, set the teamsCopy to (a copy of) the original array of teams
        teamsCopy = [...teamsFromAPI];
      }

      // If the showInternational checkbox is not checked, filter out international teams
      if (!showInternational) {
        teamsCopy = teamsCopy.filter((team) =>
          allEqualCountries(team.players.map((player) => player.country.name))
        );
      }

      // Sort the teams according to the selected sort option
      switch (sortOption) {
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
  }, [
    sortOption,
    selectedCountry,
    teamsFromAPI,
    countryTeamLUT,
    showInternational,
  ]);

  return (
    <div className="body">
      <div className="filter-and-sort">
        <div className="sort">
          <label htmlFor="sort">Sort options: </label>
          <select
            value={sortOption}
            name="sort"
            id="sort"
            onChange={(e) => handleChangeSort(e.target.value)}
          >
            <option value="rank-ascending">By rank (ascending)</option>
            <option value="rank-descending">By rank (descending)</option>
            <option value="name-a-z">By team name (a-z)</option>
            <option value="name-z-a">By team name (z-a)</option>
          </select>
        </div>
        <div className="filter">
          <div className="country-select">
            <label htmlFor="sort">Show teams with players from country: </label>
            <select
              value={selectedCountry}
              name="country"
              id="country"
              onChange={(e) => handleChangeCountry(e.target.value)}
            >
              <option value="">All countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="international">
            <label htmlFor="international">Show international teams: </label>
            <input
              checked={showInternational}
              type="checkbox"
              name="international"
              id="international"
              onChange={(e) => handleChangeInternational(e.target.checked)}
            />
          </div>
        </div>
      </div>
      <hr className="solid" />
      {teams.length > 0 ? (
        <div className="teams">
          {teams.map((team) => (
            <Team key={team.id} team={team} />
          ))}
        </div>
      ) : (
        "No teams match your current filters"
      )}
    </div>
  );
}
