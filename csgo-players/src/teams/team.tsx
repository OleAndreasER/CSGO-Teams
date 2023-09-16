import "./team.css";
import { TeamData } from "./teams";
import Player from "./player";
import { AiOutlineStar } from "react-icons/ai";
import { useContext } from "react";
import { FavoritesContext } from "../favorites/favorites-provider";


interface TeamProps {
  team: TeamData;
}

export default function Team({
  
  team,
  team: {
    name: teamName,
    logo,
    ranking,
    players,
  },
}: TeamProps) {

  const { toggleFavorite } = useContext(FavoritesContext);
  
  return (
    <div className="team" id="team">
        <div className="team-header">
              <div className="logo-name-and-star">
                  <img src={logo} className="logo-image" id="logo-image" />
                  <h1 className="team-name">{teamName}</h1>
              <AiOutlineStar size={40} className="favorite-star" onClick={() => toggleFavorite(team)}/>
              </div>
            <p className="ranking">Rank: {ranking} </p>
        </div>
         <div className="players"> 
            <div className="player-on-team">
                <Player player={players[0]}/>
            </div>
            <div className="player-on-team">
                <Player player={players[1]}/>
            </div>
            <div className="player-on-team">
                <Player player={players[2]}/>
            </div>
            <div className="player-on-team">
                <Player player={players[3]}/>
            </div>
            <div className="player-on-team">
                <Player player={players[4]}/>
            </div>
        </div>
    </div>
  );
}
