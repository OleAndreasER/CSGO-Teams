import { useContext } from "react";
import "./favorites.css";
import { FavoritesContext } from "./favorites-provider";
import { useTeams } from "../teams/use-teams";

export default function Favorites() {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const teams = useTeams();

  if (teams === undefined) return <div></div>;
  return (
    <div>
      <div>
        {isFavorite(teams[4])
          ? "Team[4] is a favorite"
          : "Team[4] is not a favorite"}
      </div>

      <button onClick={() => toggleFavorite(teams[4])}>
        Toggle team[4] favorite
      </button>
    </div>
  );
}
