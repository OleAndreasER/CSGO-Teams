import Team from "../teams/team";
import "./mainpage.css";
import { useEffect, useState } from "react";
import TeamNavigation from "./team-navigation/team-navigation";
import useSortedTeams from "../teams/use-sorted-teams";

export default function Mainpage() {
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showInternational, setShowInternational] = useState<boolean>(true);
  const { teams, countries } = useSortedTeams(
    selectedCountry,
    showInternational,
    sortOption
  );
  const [displayedTeamIndex, setDisplayedTeamIndex] = useState<number>(0);

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
    setDisplayedTeamIndex(0);
  }, [sortOption, selectedCountry, showInternational]);

  return (
    <div className="body">
      <div className="filter-and-sort">
        <div className="sort">
          <label className="label" htmlFor="sort">
            Sort options:{" "}
          </label>
          <select
            className="dropdown"
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
            <label className="label" htmlFor="sort">
              Filter by country:{" "}
            </label>
            <select
              className="dropdown"
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
            <label className="label" htmlFor="international">
              Show international teams:{" "}
            </label>
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
      <div className="teams-container">
        {teams.length > 0 ? (
          <div>
            <Team team={teams[displayedTeamIndex]} />
            <TeamNavigation
              displayedTeamIndex={displayedTeamIndex}
              setDisplayedTeamIndex={setDisplayedTeamIndex}
              teams={teams.length}
            />
          </div>
        ) : (
          "No teams match your current filters"
        )}
      </div>
    </div>
  );
}
