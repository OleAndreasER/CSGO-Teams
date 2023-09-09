import "./player.css";
import { PlayerData } from "./teams";

interface PlayerProps {
  player: PlayerData;
}

export default function Player({
  player: {
    fullname: fullnameWithNickname,
    image,
    nickname,
    country: { name: countryName, flag: countryFlagImage },
  },
}: PlayerProps) {
  const fullname =
    // The fullname from the API is in the format "'Firstname' 'Nickname' 'Lastname'",
    // so we need to split it up and only use the first and last name
    fullnameWithNickname.split(" ")[0] +
    " " +
    fullnameWithNickname.split(" ")[2];

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
