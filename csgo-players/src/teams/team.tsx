import "./team.css";
import { TeamData } from "./teams";
import Player from "./player";

interface TeamProps {
  team: TeamData;
}

export default function Team({
  team: {
    name: teamName,
    logo,
    ranking,
    players,
  },
}: TeamProps) {
  return (
    <div className="team" id="team">
        <div className="team-header">
            <div className="logo-name">
                <img src={logo} className="logo-image" id="logo-image" />
                <h1 className="team-name">{teamName}</h1>
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
