import "./player.css";
import { PlayerData } from "./teams";

interface PlayerProps {
  player: PlayerData;
}

export default function Player(props: PlayerProps) {
  const fullname =
    // The fullname from the API is in the format "'Firstname' 'Nickname' 'Lastname'",
    // so we need to split it up and only use the first and last name
    props.player.fullname.split(" ")[0] +
    " " +
    props.player.fullname.split(" ")[2];
  const image = props.player.image;
  const nickname = props.player.nickname;
  const countryName = props.player.country.name;
  const countryFlagImage = props.player.country.flag;

  return (
    <div className="player">
      <img src={image} className="player-image" />
      <h1 className="player-nickname">{nickname}</h1>
      <p className="player-fullname">{fullname} </p>
      <div className="player-country">
        <img src={countryFlagImage} className="player-country-flag" />
        <p className="player-country-name">{countryName}</p>
      </div>
    </div>
  );
}
